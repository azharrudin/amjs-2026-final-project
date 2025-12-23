using System.ComponentModel.DataAnnotations;

namespace NETCHARSP_BACKEND.Models.DTO
{
    public class RentRequest
    {
        [Required]
        public int CustomerId { get; set; }

        [Required]
        public int CarId { get; set; }

        [Required]
        public DateTimeOffset RentalDate { get; set; }

        [Required]
        public DateTimeOffset ReturnDate { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (RentalDate > ReturnDate)
            {
                yield return new ValidationResult(
                    "RentalDate must be earlier than or equal to ReturnDate.",
                    new[] { nameof(RentalDate), nameof(ReturnDate) });
            }
        }
    }
    public class TrRentalDto
    {
        public int RentalId { get; set; }
        public int CustomerId { get; set; }
        public int CarId { get; set; }
        public DateTimeOffset RentalDate { get; set; }
        public DateTimeOffset ReturnDate { get; set; }
    }
}
