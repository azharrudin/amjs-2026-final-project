using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NETCHARSP_BACKEND.Models
{
    [Table("MsCustomer")]
    public class MsCustomer
    {
        [Key]
        [Column("Customer_id", TypeName = "int")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CustomerId { get; set; }

        [Required]
        [Column("email", TypeName = "varchar(100)")]
        [MaxLength(100)]
        public string Email { get; set; } = null!;

        [Required]
        [Column("password", TypeName = "varchar(100)")]
        [MaxLength(100)]
        public string PasswordHash { get; set; } = null!;

        [Column("name", TypeName = "varchar(200)")]
        [MaxLength(200)]
        public string? Name { get; set; }

        [Column("phone_number", TypeName = "varchar(50)")]
        [MaxLength(50)]
        public string? PhoneNumber { get; set; }

        [Column("address", TypeName = "varchar(500)")]
        [MaxLength(500)]
        public string? Address { get; set; }

        [Column("driver_license_number", TypeName = "varchar(100)")]
        [MaxLength(100)]
        public string? DriverLicenseNumber { get; set; }
    }
}