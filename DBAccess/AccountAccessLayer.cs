using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MINIPROJECT91.Models.Users;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MINIPROJECT91.DBAccess
{
    public class AccountAccessLayer : IAccountAccess
    {
        private readonly AppSettings _appSettings;
        private DatabaseContext db;
        public AccountAccessLayer(IOptions<AppSettings> appSettings, DatabaseContext dbcontext)
        {
            _appSettings = appSettings.Value;
            db = dbcontext;
        }

        public async Task <ResponseModel> Authenticate(LoginModel model)
        {
            var user =  db.users.SingleOrDefault(x => x.Username == model.Username && x.Password == model.Password);

            // return null if user not found
            if (user == null) return null;

            // authentication successful so generate jwt token
            var token = generateJwtToken(user);

            return  new ResponseModel (user, token);
        }


        public async Task<User> Registration(User usr)
        {
            try
            {
                bool IsExists = db.users.Any(e => e.Username == usr.Username);
                if (IsExists != true)
                {
                    await db.users.AddAsync(usr);
                    await db.SaveChangesAsync();
                    return usr;
                }
                return null;
            }
            catch (Exception ex) { throw ex; }
        }

        //public IQueryable<User> GetAll(string userId)
        //{
        //    int userid = Convert.ToInt32(userId);
        //    var user = db.users.Where(x => x.Id == userid).Select(e => new User
        //    {
        //        Username = e.Username,
        //        FirstName = e.FirstName,
        //        LastName = e.LastName
        //    });
        //    return user;
        //}

        public User GetById(int id)
        {
            return db.users.FirstOrDefault(x => x.userId == id);
        }

        // helper methods

        private string generateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            //var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.userId.ToString()) }),
                //Expires = DateTime.UtcNow.AddDays(7),
                Expires = DateTime.Now.AddMinutes(30), 
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
