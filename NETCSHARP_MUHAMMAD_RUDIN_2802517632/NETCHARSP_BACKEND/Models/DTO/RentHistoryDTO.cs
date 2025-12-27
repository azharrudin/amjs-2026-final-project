using System.ComponentModel.DataAnnotations;

namespace NETCHARSP_BACKEND.Models.DTO
{
    public class RentHistoryResponse
    {
        public DateTime startdate { get; set;  }
        public string name { get; set;  }
        public string model { get; set;  }
        public string totalDays { get; set;  }
        public string totalPrice { get; set;  }
        public decimal priceperday { get; set;  }
        public string paymentStatus { get; set;  }

    }
}
