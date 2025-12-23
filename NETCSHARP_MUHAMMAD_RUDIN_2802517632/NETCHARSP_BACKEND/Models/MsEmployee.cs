using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NETCHARSP_BACKEND.Models
{
    [Table("MsEmployee")]
    public class MsEmployee
    {
        [Key]
        [Column("Employee_id", TypeName = "nvarchar(36)")]
        [MaxLength(36)]
        public string EmployeeId { get; set; } = null!;

        [Column("name", TypeName = "nvarchar(200)")]
        [MaxLength(200)]
        public string? Name { get; set; }

        [Column("position", TypeName = "nvarchar(4000)")]
        [MaxLength(4000)]
        public string? Position { get; set; }

        [Column("email", TypeName = "nvarchar(100)")]
        [MaxLength(100)]
        public string? Email { get; set; }

        [Column("phone_number", TypeName = "nvarchar(36)")]
        [MaxLength(36)]
        public string? PhoneNumber { get; set; }

        // Navigation properties
        public ICollection<TrMaintenance>? Maintenances { get; set; }
    }
}