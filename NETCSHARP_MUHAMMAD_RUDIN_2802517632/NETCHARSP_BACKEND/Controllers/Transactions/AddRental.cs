using Microsoft.AspNetCore.Mvc;
using NETCHARSP_BACKEND.Models;
using NETCHARSP_BACKEND.Models.DTO;
using NETCHARSP_BACKEND.Persistence;
using NETCHARSP_BACKEND.Persistence.JWT;

namespace NETCHARSP_BACKEND.Controllers.Transactions
{
    [ApiController]
    [Route("/api/v1/")]
    public class AddRental : ControllerBase
    {
        private readonly AppDBContext _context;
        private readonly JWT jwt;
        public AddRental(AppDBContext context, JWT _jwt)
        {
            _context = context;
            jwt = _jwt;
        }

        [HttpPost]
        [Route("rent")]
        public IActionResult RentCar([FromBody] RentRequest request)
        {
            TokenValidationResponse akun = jwt.ValidateToken(new TokenValidationRequest { Token = request.token });
            if(akun.validation == false)
            {
                return NotFound(new { message = "Customer not found, wrong token." });

            }
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var start = request.RentalDate;
            var end = request.ReturnDate;

            if (start > end)
                return BadRequest(new { message = "RentalDate must be earlier than or equal to ReturnDate." });

            // Ensure customer exists
            var customer = _context.Customers.Find(Int32.Parse(akun.userid));
            if (customer is null)
                return NotFound(new { message = "Customer not found." });

            // Ensure car exists and is active
            var car = _context.MsCar.Find(request.CarId);
            if (car is null)
                return NotFound(new { message = "Car not found." });

            if (!car.Status)
                return BadRequest(new { message = "Car is not active." });

            // Check overlapping rentals for the same car
            var overlapExists = _context.TrRental
                .Any(r => r.CarId == request.CarId
                          && r.RentalDate <= end
                          && r.ReturnDate >= start);

            if (overlapExists)
                return Conflict(new { message = "Car is not available for the requested dates." });

            // Create and persist rental
            var rental = new TrRental
            {
                CustomerId = Int32.Parse(akun.userid),
                CarId = request.CarId,
                RentalDate = start,
                ReturnDate = end
            };

            _context.TrRental.Add(rental);
            _context.SaveChanges();

            var response = new TrRentalDto
            {
                RentalId = rental.RentalId,
                CustomerId = rental.CustomerId,
                CarId = rental.CarId,
                RentalDate = rental.RentalDate,
                ReturnDate = rental.ReturnDate
            };

            return Ok(response);
        }

    }
}
