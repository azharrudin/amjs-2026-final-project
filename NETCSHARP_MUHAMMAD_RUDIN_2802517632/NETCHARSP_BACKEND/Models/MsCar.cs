
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NETCHARSP_BACKEND.Models
{
    [Table("MsCar")]
    public class MsCar
    {
        [Key]
        [Column("Car_id", TypeName = "int")]
        public int CarId { get; set; }

        [Column("name", TypeName = "nvarchar(200)")]
        [MaxLength(200)]
        public string? Name { get; set; }

        [Column("model", TypeName = "nvarchar(100)")]
        [MaxLength(100)]
        public string? Model { get; set; }

        [Column("year", TypeName = "int")]
        public int? Year { get; set; }

        [Column("license_plate", TypeName = "nvarchar(50)")]
        [MaxLength(50)]
        public string? LicensePlate { get; set; }

        [Column("number_of_car_seats", TypeName = "int")]
        public int? NumberOfCarSeats { get; set; }

        [Column("transmission", TypeName = "nvarchar(100)")]
        [MaxLength(100)]
        public string? Transmission { get; set; }

        [Column("price_per_day", TypeName = "decimal(18,2)")]
        public decimal? PricePerDay { get; set; }

        [Column("status", TypeName = "bit")]
        public bool Status { get; set; }

        // Navigation properties
        public ICollection<TrRental>? Rentals { get; set; }
        public ICollection<TrMaintenance>? Maintenances { get; set; }
        public ICollection<MsCarImages>? Images { get; set; }
    }
}