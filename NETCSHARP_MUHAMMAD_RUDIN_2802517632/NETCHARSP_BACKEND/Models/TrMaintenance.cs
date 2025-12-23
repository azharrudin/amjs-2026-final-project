using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NETCHARSP_BACKEND.Models
{
    [Table("TrMaintenance")]
    public class TrMaintenance
    {
        [Key]
        [Column("Maintenance_id", TypeName = "int")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MaintenanceId { get; set; }

        [Column("maintenance_date", TypeName = "datetime2")]
        public DateTime MaintenanceDate { get; set; }

        [Column("description", TypeName = "nvarchar(4000)")]
        [MaxLength(4000)]
        public string? Description { get; set; }

        [Column("cost", TypeName = "decimal(18,2)")]
        public decimal Cost { get; set; }

        [Column("car_id", TypeName = "int")]
    
        public int CarId { get; set; }

        [Column("employee_id", TypeName = "nvarchar(36)")]
        [MaxLength(36)]
        public string? EmployeeId { get; set; }

        // Navigation properties
        [ForeignKey("CarId")]
        public MsCar? Car { get; set; }

        [ForeignKey("EmployeeId")]
        public MsEmployee? Employee { get; set; }
    }
}