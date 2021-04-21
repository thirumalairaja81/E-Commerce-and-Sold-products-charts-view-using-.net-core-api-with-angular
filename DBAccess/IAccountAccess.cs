using MINIPROJECT91.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MINIPROJECT91.DBAccess
{
    public interface IAccountAccess
    {
        User GetById(int id);
        //public IQueryable<User> GetAll(string userId);
        public Task< ResponseModel> Authenticate(LoginModel model);
        public Task<User> Registration(User usr);
    }
}
