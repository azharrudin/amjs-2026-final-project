using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using NETCHARSP_BACKEND.Persistence;
using NETCHARSP_BACKEND.Models;
using NETCHARSP_BACKEND.Models.DTO;

namespace NETCHARSP_BACKEND.Controllers.Transactions
{
    [ApiController]
    [Route("/api/v1/cars")]
    public class GetAvailableCars : ControllerBase
    {
        private readonly AppDBContext _context;
        public GetAvailableCars(AppDBContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("available")]
        public IActionResult GetAvailableCarsList([FromBody] GetAvailableCarRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var start = request.StartDate;
            var end = request.EndDate;

            if (start > end)
                return BadRequest(new { message = "StartDate must be earlier than or equal to EndDate." });

            var availableCars = _context.MsCar
                        .Where(car => car.Status) // only active cars
                        .Where(car => !car.Rentals.Any(r =>
                            // overlap if rental.StartDate <= requested.EndDate && rental.EndDate >= requested.StartDate
                            r.RentalDate <= end && r.ReturnDate >= start
                        ))
                        .Select(car => new
                        {
                            car.CarId,
                            car.Name,
                            car.Model,
                            car.Year,
                            car.LicensePlate,
                            car.NumberOfCarSeats,
                            car.Transmission,
                            car.PricePerDay,
                            car.Images
                        })
                        .ToList();

            return Ok(availableCars);
        }
    }
}
