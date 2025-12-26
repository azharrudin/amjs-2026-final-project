using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NETCHARSP_BACKEND.Models;
using NETCHARSP_BACKEND.Models.DTO;
using NETCHARSP_BACKEND.Persistence;
using NETCHARSP_BACKEND.Persistence.JWT;
using System.IdentityModel.Tokens.Jwt;

namespace NETCHARSP_BACKEND.Controllers.Auth
{
    [ApiController]
    [Route("/api/v1/auth")]
    public class LoginController : ControllerBase
    {
        private readonly JWT _jwt;
        private readonly AppDBContext _context;

      
        public LoginController(AppDBContext context, JWT jwt)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _jwt = jwt ?? throw new ArgumentNullException(nameof(jwt));
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (request is null)
                return BadRequest(new { message = "Request body is required." });

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Find customer by email. Use case-insensitive comparison if desired.
            var customer = _context.Customers
                .FirstOrDefault(c => c.Email == request.Email);

            if (customer == null || !VerifyPassword(request.Password, customer.PasswordHash))
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            // _jwt is injected in constructor; safe to call.
            string jwt;
            try
            {
                jwt = _jwt.CreateJwtToken(customer);
            }
            catch (Exception ex)
            {
                // Avoid exposing internal error details; log in real app.
                return StatusCode(500, new { message = "Failed to create JWT.", detail = ex.Message });
            }

            return Ok(new { message = "Login successful.", token = jwt, name = customer.Name, email = customer.Email });
        }

   
        private bool VerifyPassword(string? password, string? storedHash)
        {
            if (string.IsNullOrEmpty(password) || string.IsNullOrEmpty(storedHash))
                return false;

            return password == storedHash;
        }
    }
}
