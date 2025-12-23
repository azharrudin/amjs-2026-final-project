using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NETCHARSP_BACKEND.Models
{
    [Table("TrRental")]
    public class TrRental
    {
        [Key]
        [Column("rental_id", TypeName = "int")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RentalId { get; set; }

        // Must match MsCustomer.CustomerId (int)
        [Required]
        [Column("customer_id", TypeName = "int")]
        public int CustomerId { get; set; }

        // Must match MsCar.CarId (nvarchar(36))
        [Required]
        [Column("car_id", TypeName = "int")]
        [MaxLength(36)]
        public int CarId { get; set; }

        [Required]
        [Column("rental_date")]
        public DateTimeOffset RentalDate { get; set; }

        [Required]
        [Column("return_date")]
        public DateTimeOffset ReturnDate { get; set; }

        // Navigation properties
        [ForeignKey(nameof(CustomerId))]
        public MsCustomer? Customer { get; set; }

        [ForeignKey(nameof(CarId))]
        public MsCar? Car { get; set; }
    }

}