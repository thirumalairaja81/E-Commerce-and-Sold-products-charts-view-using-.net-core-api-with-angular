using Microsoft.EntityFrameworkCore;
using MINIPROJECT91.Models.Products;
using MINIPROJECT91.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MINIPROJECT91.DBAccess
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }
        public DbSet<User> users { get; set; }
        public DbSet<Product> products { get; set; }
        public DbSet<Order> orders { get; set; }
        //public DbSet<Cart> carts { get; set; }
        public DbSet<Carts> ShoppingCartItems { get; set; }
    }
}
