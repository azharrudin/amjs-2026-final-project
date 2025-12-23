using System.ComponentModel.DataAnnotations;

namespace NETCHARSP_BACKEND.Models.DTO
{
    public class RegisterRequest
    {
        [Required, EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;

        [Required]
        public string Name { get; set; } = null!;

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public string Address { get; set; }


        [Required]
        public string Driverlicense { get; set; }

    }
}
