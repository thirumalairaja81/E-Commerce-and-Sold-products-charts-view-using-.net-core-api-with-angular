using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MINIPROJECT91.Models.Products
{
    [Table("tbl_product")]
    public class Product
    {
        [Key]
        public int productId { get; set; }
        public string productName { get; set; }
        public string produtImg { get; set; }
        public decimal price { get; set; }
        public int quantity { get; set; }

    }
}
