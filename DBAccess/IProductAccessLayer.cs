using MINIPROJECT91.Models.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MINIPROJECT91.DBAccess
{
    public interface IProductAccessLayer
    {
        public Task<List<Product>> GetProducts();
        public Task<List<Carts>> Getitems(int id);
        public Task<string> Updatecart(Carts Up);
        public Task<int> Deletecart(string id);
        //public Task<int> AddCart(Cart crt);
        public Task<Carts> AddToCart(Carts crt);
        public Task<List<reponsemodel>> Getorders(int id);
        public Task<string> Addorders(Order or);
        public Task<int> GetTotal(int id);
        public Task<int> GetCount(int id);
    }
}
