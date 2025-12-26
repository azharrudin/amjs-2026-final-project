using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NETCHARSP_BACKEND.Models;
using NETCHARSP_BACKEND.Persistence;
using NETCHARSP_BACKEND.Models.DTO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NETCHARSP_BACKEND.Controllers.Transactions
{
    [ApiController]
    [Route("/api/v1/cars")]
    public class GetCarController : ControllerBase
    {
        private readonly AppDBContext _db;

        public GetCarController(AppDBContext db)
        {
            _db = db;
        }

        [HttpPost]
        [Route("get")]
        public async Task<ActionResult<GetCarResponse>> GetCar([FromBody] GetCarRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.carID))
            {
                return BadRequest("carID is required.");
            }

            if (!int.TryParse(request.carID, out var carId))
            {
                return BadRequest("carID must be a valid integer.");
            }

            var car = await _db.Set<MsCar>()
                .AsNoTracking()
                .Include(c => c.Images)
                .FirstOrDefaultAsync(c => c.CarId == carId);

            if (car == null)
            {
                return NotFound();
            }

            // Map images to plain objects (copy scalar fields) to avoid including navigation properties
            List<MsCarImages>? images = car.Images?
                .Select(i => new MsCarImages
                {
                    ImageCarId = i.ImageCarId,
                    CarId = i.CarId,
                    ImageLink = i.ImageLink
                })
                .ToList();

            var response = new GetCarResponse
            {
                carID = car.CarId,
                year = car.Year ?? 0,
                price = car.PricePerDay.HasValue ? (int)car.PricePerDay.Value : 0,
                name = car.Name ?? string.Empty,
                model = car.Model ?? string.Empty,
                license = car.LicensePlate ?? string.Empty,
                Images = images,
                Transmission = car.Transmission,
                NUS = car.NumberOfCarSeats ?? 0
            };

            return Ok(response);
        }
    }
}