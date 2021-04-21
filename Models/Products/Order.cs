using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MINIPROJECT91.Models.Products
{

    [Table("tbl_orders")]
    public class Order
    {
        [Key]
        public int orderId { get; set; }
        public int userId { get; set; }
        public string cartDetails { get; set; }

        public DateTime orderedDate { get; set; }
        public string orderedStatus { get; set; }
        public decimal orderedPrice { get; set; }

    }
}
