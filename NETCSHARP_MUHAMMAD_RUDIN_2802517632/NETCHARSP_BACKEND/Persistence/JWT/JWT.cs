using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NETCHARSP_BACKEND.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace NETCHARSP_BACKEND.Persistence.JWT
{
    public class TokenValidationRequest
    {
        public string Token { get; set; }
    }

    public class JWT
    {
        private readonly AppDBContext _context;
        private readonly IConfiguration _config;
        public JWT(IConfiguration config)
        {
          
            _config = config;
        }
        private int GetJwtExpiryMinutes()
        {
            if (int.TryParse(_config["Jwt:ExpireMinutes"], out var minutes))
                return Math.Max(1, minutes);
            return 60; // default
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

        public bool ValidateToken([FromBody] TokenValidationRequest token)
        {
            if (string.IsNullOrWhiteSpace(token.Token))
                return false;

            try
            {
                var key = _config["Jwt:Key"];
                var issuer = _config["Jwt:Issuer"];
                var audience = _config["Jwt:Audience"];

                if (string.IsNullOrWhiteSpace(key))
                    return false;

                var tokenHandler = new JwtSecurityTokenHandler();
                var securityKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(key));

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

                tokenHandler.ValidateToken(token.Token, parameters, out _);
                return true;
            }
            catch
            {
                return false;
            }
        }

       

   
    }

}
