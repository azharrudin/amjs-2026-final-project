using Microsoft.IdentityModel.Tokens;
using NETCHARSP_BACKEND.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace NETCHARSP_BACKEND.Persistence.JWT
{
    public class TokenValidationRequest
    {
        public required string Token { get; set; }
    }

    // New DTO to return email and username (or null if invalid)
    public class TokenValidationResponse
    {
        public string? Email { get; set; }
        public string? Username { get; set; }
        public bool validation { get; set; }
        public string userid { get; set; }
    }

    public class JWT
    {
        private readonly AppDBContext? _context;
        private readonly IConfiguration _config;
        public JWT(IConfiguration config)
        {
            _config = config;
        }

        private int GetJwtExpiryMinutes()
        {
            if (int.TryParse(_config["Jwt:ExpireMinutes"], out var minutes))
                return Math.Max(1, minutes);
            return 60;
        }

        public string CreateJwtToken(MsCustomer customer)
        {
            var key = _config["Jwt:Key"];
            var issuer = _config["Jwt:Issuer"];
            var audience = _config["Jwt:Audience"];
            var expiryMinutes = GetJwtExpiryMinutes();

            if (string.IsNullOrEmpty(key))
                throw new InvalidOperationException("JWT Key is not configured (Jwt:Key).");

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, customer.CustomerId.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, customer.Email ?? string.Empty),
                // Include username so it can be returned on validation
                new Claim(JwtRegisteredClaimNames.UniqueName, customer.Name ?? string.Empty),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddMinutes(expiryMinutes),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public TokenValidationResponse? ValidateToken(TokenValidationRequest token)
        {
            if (token == null || string.IsNullOrWhiteSpace(token.Token))
                return null;

            try
            {
                var key = _config["Jwt:Key"];
                var issuer = _config["Jwt:Issuer"];
                var audience = _config["Jwt:Audience"];

                if (string.IsNullOrWhiteSpace(key))
                    return null;

                var tokenHandler = new JwtSecurityTokenHandler();
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));

                var parameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = securityKey,

                    ValidateIssuer = true,
                    ValidIssuer = issuer,

                    ValidateAudience = true,
                    ValidAudience = audience,

                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };

                // Validate and get principal
                var principal = tokenHandler.ValidateToken(token.Token, parameters, out _);
                if (principal == null)
                    return null;

                // Extract email and username from claims with safe fallbacks
                var email = principal.FindFirst(JwtRegisteredClaimNames.Email)?.Value
                            ?? principal.FindFirst(ClaimTypes.Email)?.Value;

                var userid = principal.FindFirst(JwtRegisteredClaimNames.Sub)?.Value
                            ?? principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var username = principal.FindFirst(JwtRegisteredClaimNames.UniqueName)?.Value
                               ?? principal.FindFirst(ClaimTypes.Name)?.Value
                               ?? principal.FindFirst("name")?.Value
                               ?? principal.FindFirst("preferred_username")?.Value
                               ?? principal.FindFirst(JwtRegisteredClaimNames.Sub)?.Value; 

                

                return new TokenValidationResponse
                {
                    Email = string.IsNullOrWhiteSpace(email) ? null : email,
                    Username = string.IsNullOrWhiteSpace(username) ? null : username,
                    userid = string.IsNullOrWhiteSpace(userid) ? null : userid,
                    validation = string.IsNullOrWhiteSpace(username) ? false : true,
                };
            }
            catch
            {
                return new TokenValidationResponse
                {
                    Email = null,
                    Username = null,
                    validation = false
                };
            }
        }
    }
}
