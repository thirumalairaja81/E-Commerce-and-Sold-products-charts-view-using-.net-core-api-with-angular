using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MINIPROJECT91.Models.Users
{
    [Table("tbl_userprofile")]
    public class User
    {
        [Key]
        public int userId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }

        //[JsonIgnore]
        public string Password { get; set; }
    }
}
