using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MINIPROJECT91.Models.Users
{
    public class ResponseModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }


        public ResponseModel(User user, string token)
        {
            Id = user.userId;
            FirstName = user.FirstName;
            LastName = user.LastName;
            Username = user.Username;
            Token = token;
        }
    }
}
