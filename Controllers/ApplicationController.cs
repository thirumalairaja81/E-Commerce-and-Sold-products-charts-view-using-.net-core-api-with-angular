using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MINIPROJECT91.DBAccess;
using MINIPROJECT91.Helpers;
using MINIPROJECT91.Models.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MINIPROJECT91.Controllers
{
   // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationController : ControllerBase
    {
     private IProductAccessLayer _accesslayer;
        private IChartsAccessLayer _chartsAccessLayer;
        public ApplicationController(DatabaseContext _context)
        {
            _accesslayer = new ProductAccessLayer(_context);
            _chartsAccessLayer = new ChartsAccessLayer(_context);
        }

        [HttpPost]
        [Route("AddedCart")]
        public async Task<IActionResult> AddCart(Carts crt)
        {

            try
            {
               var res = await  _accesslayer.AddToCart(crt);
                if (res == null)
                    return BadRequest(new { message = "Quantity Shouldn't be more than 10" });
                return Ok(res);
                    }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [Route("CartList/{id}")]
        public async Task<IActionResult> GetCartList(int id)
        {
            try
            {
                var result = await _accesslayer.Getitems(id);
                if(result == null)
                    return BadRequest(new { message = "Login to continue shop" });
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPut]
        [Route("EditedCart")]
        public async Task<IActionResult> QuantityUpdate(Carts Up)
        {
            try
            {
                var result = await _accesslayer.Updatecart(Up);
                return Ok(result);
            }
            catch (Exception ex)
            {
                {
                    throw ex;
                }
            }
        }

        [HttpDelete]
        [Route("DeletedCart/{id}")]
        public async Task<IActionResult> DeletePost(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }
            try
            {
                int result = await _accesslayer.Deletecart(id);
                if (result == 0)
                {
                    return NotFound();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                throw ex;

            }
        }

        [HttpGet]
        [Route("GetTotal/{id}")]
        public async Task<IActionResult> GetTotal(int id)
        {
            try
            {
                return Ok(await _accesslayer.GetTotal(id));
            }
            catch (Exception Ex)
            {
                throw Ex;
            }
        }

        [HttpGet]
        [Route("GetCount/{id}")]
        public async Task<IActionResult> GetCount(int id)
        {
            try
            {
                return Ok(await _accesslayer.GetCount(id));
            }
            catch (Exception Ex)
            {
                throw Ex;
            }
        }

        [HttpPost]
        [Route("CreateOrder")]
        public async Task<IActionResult> AddPost(Order or)
        {
            try
            {
                if (or == null)
                    return BadRequest(new { message = "Orders Should Not Be Null" });
                return Ok(await _accesslayer.Addorders(or));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [Route("OrderedList/{id}")]
        public async Task<IActionResult> GetOrderedList(int id)
        {
            try
            {
                return Ok(await _accesslayer.Getorders(id));

            }catch(Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [Route("OrderByDate")]
        public async Task<IActionResult> OrderByDate()
        {
            try
            {
                var result = await _chartsAccessLayer.OrderByProduct();
                if (result == null)
                    return BadRequest(new { message = "Error Occurred " });
                return Ok(result);
            }catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
