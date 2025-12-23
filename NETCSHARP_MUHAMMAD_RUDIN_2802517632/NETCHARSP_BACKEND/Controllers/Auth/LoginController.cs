using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NETCHARSP_BACKEND.Models;
using NETCHARSP_BACKEND.Models.DTO;
using NETCHARSP_BACKEND.Persistence;
namespace NETCHARSP_BACKEND.Controllers.Auth
{
     [ApiController]
     [Route("/api/v1/login")]
      public class LoginController : ControllerBase
      {
            private readonly AppDBContext _context;
            public LoginController(AppDBContext context)
            {
                _context = context;
            }
            [HttpPost]
            [Route("login")]
            public IActionResult Login([FromBody] LoginRequest request)
            {
                var customer = _context.Customers
                    .FirstOrDefault(c => c.Email == request.Email);
                if (customer == null || !VerifyPassword(request.Password, customer.PasswordHash))
                {
                    return Unauthorized(new { message = "Invalid email or password." });
                }
                return Ok(new { message = "Login successful." });
            }
            private bool VerifyPassword(string password, string storedHash)
            {

                return password == storedHash; 
            }
      }
}
