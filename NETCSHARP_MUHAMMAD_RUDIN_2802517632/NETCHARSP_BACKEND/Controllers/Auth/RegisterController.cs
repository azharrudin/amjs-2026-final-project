using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NETCHARSP_BACKEND.Models;
using NETCHARSP_BACKEND.Models.DTO;
using NETCHARSP_BACKEND.Persistence;

namespace NETCHARSP_BACKEND.Controllers.Auth
{
    [ApiController]
    [Route("/api/v1/auth")]
    public class RegisterController : ControllerBase
    {
        private readonly AppDBContext _context;
        public RegisterController(AppDBContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("register")]
        public IActionResult register([FromBody] RegisterRequest request)
        {
            if (request == null)
            {
                return BadRequest(new { message = "Invalid request body.", status = "invalid"});
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var normalizedEmail = (request.Email ?? string.Empty).Trim().ToLowerInvariant();

            var exists = _context.Customers.AsNoTracking().Any(c => c.Email.ToLower() == normalizedEmail);
            if (exists)
            {
                return Conflict(new { message = "Email is already registered.", status = "invalid"});
            }

            if (string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new { message = "Password is required.", status = "invalid"});
            }

            

            var customer = new MsCustomer
            {
                Email = normalizedEmail,
                PasswordHash = request.Password,
                Name = request.Name,
                PhoneNumber = request.PhoneNumber,
                Address = request.Address,
                DriverLicenseNumber = request.Driverlicense
            };

            _context.Customers.Add(customer);
            _context.SaveChanges();

        
            var result = new
            {
                customer.CustomerId,
                customer.Email,
                customer.Name,
                customer.PhoneNumber,
                customer.Address,
                customer.DriverLicenseNumber
            };

            return Created(string.Empty, result);
        }

    }
}
