using Microsoft.AspNetCore.Mvc;
using NETCHARSP_BACKEND.Models;
using NETCHARSP_BACKEND.Models.DTO;
using NETCHARSP_BACKEND.Persistence;

namespace NETCHARSP_BACKEND.Controllers.Transactions
{
    [ApiController]
    [Route("/api/v1/")]
    public class AddRental : ControllerBase
    {
        private readonly AppDBContext _context;
        public AddRental(AppDBContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("rent")]
        public IActionResult GetAvailableCarsList([FromBody] RentRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var start = request.RentalDate;
            var end = request.ReturnDate;

            if (start > end)
                return BadRequest(new { message = "RentalDate must be earlier than or equal to ReturnDate." });

            // Ensure customer exists
            var customer = _context.Customers.Find(request.CustomerId);
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
                CustomerId = request.CustomerId,
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
