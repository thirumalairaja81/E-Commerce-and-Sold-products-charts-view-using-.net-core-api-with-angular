using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MINIPROJECT91.DBAccess;
using MINIPROJECT91.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MINIPROJECT91.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IAccountAccess _accessLayer;
        public AccountController(IAccountAccess accessLayer)
        {
            _accessLayer = accessLayer;
        }
        //[AllowAnonymous]
        [HttpPost("Login")]

        public async Task<IActionResult> Authenticate(LoginModel credential)
        {
            try
            {
                var response = await  _accessLayer.Authenticate(credential);
                if (response == null)
                    return BadRequest(new { message = "Username Or Password is invalid" });
                return Ok( response);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(User user)
        {
            try
            {
                var response = await _accessLayer.Registration(user);
                if (response == null)
                    return BadRequest(new { message = "User is already exists" });
                return Ok(response);
            }catch(Exception ex)
            {
                throw ex;
            }
        }

    }
}
