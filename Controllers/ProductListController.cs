using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MINIPROJECT91.DBAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MINIPROJECT91.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductListController : ControllerBase
    {
        private IProductAccessLayer _accessLayer;
        public ProductListController(DatabaseContext _dbcontext)
        {
            _accessLayer = new ProductAccessLayer(_dbcontext);
        }

        [HttpGet]
        public async Task<IActionResult> ProductList()
        {
            try
            {
                var result = await _accessLayer.GetProducts();
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
