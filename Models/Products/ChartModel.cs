using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MINIPROJECT91.Models.Products
{
    public class ChartModel
    {
     
        public int productId { get; set; }
  
        public string productName { get; set; }
        public int quantity { get; set; }
   
        public DateTime orderedDate { get; set; }
        public decimal totalPrice { get; set; }
       
    }
}
