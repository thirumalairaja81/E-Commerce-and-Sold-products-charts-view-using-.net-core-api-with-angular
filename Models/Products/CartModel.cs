using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MINIPROJECT91.Models.Products
{
    public class CartModel
    {

        public string itemId { get; set; }
        public string cartId { get; set; }
        public int productId { get; set; }
        public int userId { get; set; }
        public string productName { get; set; }

        public int quantity { get; set; }

        public System.DateTime createdDate { get; set; }
        public string cartStatus { get; set; }
        public decimal price { get; set; }
        public decimal totalPrice { get; set; }

        //public int totalsalecount { get; set; }

    }
    public class reponsemodel
    {
      public List<CartModel> cartModel { get; set; }
        public long orderid { get; set; }
        public string orderedStatus { get; set; }
        public decimal orderedPrice { get; set; }
        public DateTime orderedDate { get; set; }
    }
}
