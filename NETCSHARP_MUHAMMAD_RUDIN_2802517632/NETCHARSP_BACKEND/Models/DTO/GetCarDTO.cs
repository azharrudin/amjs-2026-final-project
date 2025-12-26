using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NETCHARSP_BACKEND.Models.DTO
{
    public class GetCarRequest
    {
        [Required]
        public string carID { get; set; } = null!;
    }
    public class GetCarResponse
    {
        public int carID { get; set; }
        public int year { get; set; }
        public int price { get; set; }
        public string name { get; set; }
        public string model { get; set; }
        public string license { get; set; }
        public string Transmission { get; set; }
        public int NUS { get; set; }
        public ICollection<MsCarImages>? Images { get; set; }
    }

}
