
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NETCHARSP_BACKEND.Models
{
    [Table("MsCarImages")]
    public class MsCarImages
    {
        [Key]
        [Column("Image_car_id", TypeName = "int")]
        [MaxLength(36)]
        public int ImageCarId { get; set; }

        [Column("Car_id", TypeName = "int")]
        [MaxLength(36)]
        public int CarId { get; set; }

        [Column("image_link", TypeName = "nvarchar(2000)")]
        [MaxLength(2000)]
        public string ImageLink { get; set; } = null!;

        // Navigation
        [ForeignKey("CarId")]
        public MsCar? Car { get; set; }
    }
}