using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NETCHARSP_BACKEND.Models;
using NETCHARSP_BACKEND.Models.DTO;
using NETCHARSP_BACKEND.Persistence;
using NETCHARSP_BACKEND.Persistence.JWT;
using System.Linq;
using System.Text.Json;

namespace NETCHARSP_BACKEND.Controllers.Transactions
{
    [ApiController]
    [Route("/api/v1")]
    public class RentHistory : ControllerBase
    {
        private readonly JWT _jwt;
        private readonly AppDBContext con;
        public RentHistory(AppDBContext context, JWT jwt)
        {
            _jwt = jwt ?? throw new ArgumentNullException(nameof(jwt));
            con = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpPost]
        [Route("rent-history")]
        public ActionResult<List<RentHistoryResponse>> GetRentHistory([FromBody] TokenValidationRequest token)
        {
            if (token is null)
                return BadRequest();

            TokenValidationResponse akun = _jwt.ValidateToken(token);
            if (akun is null)
                return Unauthorized();

            // Extract userid robustly (support int, long, string, JsonElement)
            object? userIdProp = null;
            try
            {
                // Try common property names in case of different shapes
                // If TokenValidationResponse has a 'userid' property, use it. Fallback to dynamic access.
                var akunType = akun.GetType();
                var prop = akunType.GetProperty("userid") ?? akunType.GetProperty("userId") ?? akunType.GetProperty("id");
                if (prop != null)
                    userIdProp = prop.GetValue(akun);
                else
                    userIdProp = akun; // fallback - will be handled below
            }
            catch
            {
                userIdProp = null;
            }

            if (userIdProp == null)
                return StatusCode(500, "Token validation response missing userid.");

            if (!TryParseUserId(userIdProp, out int userId))
                return StatusCode(500, "Invalid userid in token validation response.");


            var rentals = con.TrRental
    .AsNoTracking()
    .Include(r => r.Car)
    .Where(r => r.CustomerId == userId)
    .OrderByDescending(r => r.RentalDate)
   
    .ToList();

            var now = DateTimeOffset.UtcNow;
            var result = rentals.Select(r =>
            {
                
                DateTimeOffset rentalDateUtc = NormalizeToUtc(r.RentalDate);
                DateTimeOffset returnDateUtc = NormalizeToUtc(r.ReturnDate);

                var car = r.Car;
                var daysDecimal = (returnDateUtc - rentalDateUtc).TotalDays;
                var days = Math.Max(1, (int)Math.Ceiling(daysDecimal)); 
                var pricePerDay = car?.PricePerDay ?? 0m;
                var totalPrice = pricePerDay * days;

                return new RentHistoryResponse
                {
                    startdate = r.RentalDate,
                    name = car?.Name ?? string.Empty,
                    model = car?.Model ?? string.Empty,
                    totalDays = days.ToString(),
                    totalPrice = totalPrice.ToString("F2"),
                    priceperday = pricePerDay,
                    paymentStatus = returnDateUtc <= now ? "COMPLETED" : "ONGOING"
                };
            }).ToList();

            return Ok(result);
        }

        private static bool TryParseUserId(object? value, out int userId)
        {
            userId = 0;
            if (value == null) return false;

            try
            {
                switch (value)
                {
                    case int i:
                        userId = i;
                        return true;
                    case long l:
                        userId = (int)l;
                        return true;
                    case string s when int.TryParse(s, out var parsedS):
                        userId = parsedS;
                        return true;
                    case JsonElement je:
                        if (je.ValueKind == JsonValueKind.Number && je.TryGetInt32(out var jeInt))
                        {
                            userId = jeInt;
                            return true;
                        }
                        if (je.ValueKind == JsonValueKind.String && int.TryParse(je.GetString(), out var jeStr))
                        {
                            userId = jeStr;
                            return true;
                        }
                        break;
                    default:
                        // Try general convert
                        if (int.TryParse(Convert.ToString(value), out var conv))
                        {
                            userId = conv;
                            return true;
                        }
                        break;
                }
            }
            catch
            {
                // ignored - will return false
            }

            return false;
        }

        private static DateTimeOffset NormalizeToUtc(DateTimeOffset dto)
        {
            // If provider returns a DateTimeOffset with non-UTC offset, convert to UTC.
            return dto.ToUniversalTime();
        }
    }
}