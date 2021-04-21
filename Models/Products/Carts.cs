using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MINIPROJECT91.Models.Products
{
    [Table("tbl_checkCart")]
    public class Carts
    {
        [Key]
        public string itemId { get; set; }
        public string cartId { get; set; }
        public int productId { get; set; }
        public int userId { get; set; }
        public string productName { get; set; }
        //public string produtImg { get; set; }
        public int quantity { get; set; }
       // public  string product { get; set; }
        public System.DateTime createdDate { get; set; }
        //public decimal price { get; set; }
        public decimal price { get; set; }
        public string cartStatus { get; set; }
        public decimal totalPrice { get; set; }

    }
}
