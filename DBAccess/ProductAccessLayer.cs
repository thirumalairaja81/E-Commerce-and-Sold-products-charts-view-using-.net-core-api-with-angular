using Microsoft.EntityFrameworkCore;
using MINIPROJECT91.Models.Products;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace MINIPROJECT91.DBAccess
{
    public class ProductAccessLayer : IProductAccessLayer
    {
        
        DatabaseContext _context;
        public ProductAccessLayer(DatabaseContext context)
        {
            _context = context;
        }



        public async Task<Carts> AddToCart(Carts crt)
        {
            // Retrieve the product from the database.           
            var itemid = _context.ShoppingCartItems.Where(x => x.userId == crt.userId&& x.productId == crt.productId).Select(e => e.itemId).FirstOrDefault();
       
            var qty = _context.ShoppingCartItems.Where(x => x.userId == crt.userId && x.productId == crt.productId).Select(e => e.quantity).FirstOrDefault();
            var id = _context.ShoppingCartItems.Where(x => x.userId == crt.userId).Select(e => e.cartId).FirstOrDefault();
            var cartItem = _context.ShoppingCartItems.SingleOrDefault(
                c => c.itemId == itemid
                && c.productId == crt.productId);
            if (cartItem == null)
            {
                if (id == null)
                {
                    id = Guid.NewGuid().ToString().ToUpper();
                }
                else
                {
                    id = id;
                }
                var tot = crt.quantity * crt.price;
                var prdt = _context.products.SingleOrDefault(e => e.productId == crt.productId);
                var productJSON = JsonSerializer.Serialize(prdt);
                // Create a new cart item if no cart item exists.                 
                cartItem = new Carts
                {
                    itemId = Guid.NewGuid().ToString().ToUpper(),
                    productId = crt.productId,
                    userId = crt.userId,
                    cartId = id,
                    cartStatus = "Pending",
                    price = _context.products.Where(e => e.productId == crt.productId).Select(m => m.price).FirstOrDefault(),
                    //product = productJSON,
                    productName = crt.productName,
                    quantity = 1,
                    totalPrice = tot,
                    createdDate = DateTime.Now
                };

                _context.ShoppingCartItems.Add(cartItem);
               
            }
            else
            {
                //Quantity shouldn't be more than 10 
                if (cartItem.quantity >= 10)
                    return null;
                // If the item does exist in the cart,                  
                // then add one to the quantity.                 
                cartItem.quantity++;
                cartItem.totalPrice = cartItem.quantity * cartItem.price;

            }
            _context.SaveChanges();
            return cartItem;
        }

        public async Task<List<Product>> GetProducts()
        {
            try
            {
                //Listing Products for shopping page
                List<Product> list = await _context.products.ToListAsync();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public async Task<List<Carts>> Getitems(int id)
        {
            try
            {
                //Listing Added Carts List Based on concerned logged user
                if (id == null)
                    return null;
                var list = await _context.ShoppingCartItems.Where(e => e.userId == id).ToListAsync();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<string> Updatecart(Carts Up)
        {
            try
            {
                Up.totalPrice = Up.price * Up.quantity;
                Up.cartStatus = "Pending";
                Up.createdDate = DateTime.Now;
                _context.ShoppingCartItems.Update(Up);
                await _context.SaveChangesAsync();
                return Up.itemId;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> Deletecart(string id)
        {
            int result = 0;

            if (id != null)
            {
                var Carts = await _context.ShoppingCartItems.FirstOrDefaultAsync(x => x.itemId == id);

                if (Carts != null)
                {
                    _context.ShoppingCartItems.Remove(Carts);
                    result = await _context.SaveChangesAsync();
                }
                return result;
            }
            return result;
        }
        public async Task<int> GetTotal(int id)
        {
            var sum = await _context.ShoppingCartItems.Where(e=>e.userId == id).Select(a => a.totalPrice).SumAsync();
            int total = Convert.ToInt32(sum);
            return total;
        }

        public async Task<int> GetCount(int id)
        {
            var count = await _context.ShoppingCartItems.Where(e=>e.userId == id).CountAsync();
            int cartCount = Convert.ToInt32(count);
            return cartCount;
        }

        public async Task<List<reponsemodel>> Getorders(int id)
        {
            try
            {

                var orderId = _context.orders.Where(e => e.userId == id).Select(s => s.orderId).ToList();
                if(orderId != null)
                {
                    var result = new List<reponsemodel>();

                    foreach (var items in orderId)
                    {
                        var order = new reponsemodel();
                        var cartDetails = _context.orders.Where(e => e.orderId == items).Select(s => s.cartDetails ).FirstOrDefault();
                        var deSerializeProduct = JsonSerializer.Deserialize<List<CartModel>>(cartDetails);
                        var orderedDate = _context.orders.Where(e => e.userId == id && e.orderId == items).Select(s => s.orderedDate).FirstOrDefault();
                        var orderedStat = _context.orders.Where(e => e.userId == id && e.orderId == items).Select(s => s.orderedStatus).FirstOrDefault();
                        var orderedPrice = _context.orders.Where(e => e.userId == id && e.orderId == items).Select(s => s.orderedPrice).FirstOrDefault();


                        order.cartModel = deSerializeProduct;
                        order.orderid = items;
                        order.orderedPrice = orderedPrice;
                        order.orderedStatus = orderedStat;
                        order.orderedDate = Convert.ToDateTime(orderedDate);
                        result.Add(order);
                        
                    } return result.OrderBy(e => e.orderedDate).ToList() ;
                }
                 return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

   
        public async Task<string> Addorders(Order or)
        {

            try
            {

                var value = (from s in _context.ShoppingCartItems
                           where s.userId == or.userId
                           select new Carts
                           {
                               itemId = s.itemId,
                               cartId = s.cartId,
                               cartStatus = "Success",
                               totalPrice = s.totalPrice,
                               productId = s.productId,
                               quantity = s.quantity,
                               price = s.price,
                               productName = s.productName,
                               //product = s.product,
                               createdDate = s.createdDate,
                               userId = or.userId
                           }).ToList();

              
                //var cartIds = _context.ShoppingCartItems.Where(n => n.userId == or.userId).Select(e => e.itemId).ToList();
                    var val = _context.ShoppingCartItems.Where(e => e.userId == or.userId).Select(s=>s.itemId).ToList();
                //var result = new List<Carts>();
                   var orderJSON = JsonSerializer.Serialize(value);
                    or.cartDetails = orderJSON;
                    or.orderedDate = DateTime.Now;
                    or.orderedPrice = or.orderedPrice;
                    or.orderedStatus = "Success";
                    _context.orders.Add(or);
                    await _context.SaveChangesAsync();


                  foreach(var cartItemId in val)
                  {
                    var cartstatus = new Carts();
                    var orderstatus = _context.ShoppingCartItems.Where(e => e.itemId == cartItemId && e.userId == or.userId).Select(s => s.cartStatus).FirstOrDefault();
                    orderstatus = "Success";
                    cartstatus.itemId = cartItemId;
                    cartstatus.cartStatus = orderstatus;
                    cartstatus.userId = or.userId;
                    _context.ShoppingCartItems.Update(cartstatus);
                    await _context.SaveChangesAsync();
                  }

             var cartDeleteIds = _context.ShoppingCartItems.Where(e => e.userId == or.userId && e.cartStatus == "Success").Select(m => m.itemId).ToList();
                foreach(var delete in cartDeleteIds)
                {
                   
                    var Carts = await _context.ShoppingCartItems.FirstOrDefaultAsync(x => x.itemId == delete);
                    _context.ShoppingCartItems.Remove(Carts);
                    await _context.SaveChangesAsync();
                }
              return orderJSON;
              
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
