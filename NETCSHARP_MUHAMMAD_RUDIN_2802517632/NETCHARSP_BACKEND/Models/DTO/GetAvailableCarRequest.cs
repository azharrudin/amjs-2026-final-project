using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NETCHARSP_BACKEND.Models.DTO
{
    public class GetAvailableCarRequest : IValidatableObject
    {
        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        public int year { get; set; }

        public string? orderBy { get; set; }
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (EndDate < StartDate)
            {
                yield return new ValidationResult(
                    "EndDate must be the same as or later than StartDate.",
                    new[] { nameof(StartDate), nameof(EndDate) }
                );
            }
        }
    }
}