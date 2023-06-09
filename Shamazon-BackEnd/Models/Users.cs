

using System.ComponentModel.DataAnnotations;

namespace Shamazon.Models
{
    public class Users
    {
        public int Id { get; set; }
        public string FirebaseId { get; set; }
        public string Email { get; set; }
        
    }

    public class UserCheck
    {
        public int Id { get; set; }
        public string FirebaseId { get;set; }
        public string Email { get; set; }

    }
    public class LastUserId
    {
        public int Id { get; set; }
    }
    public class FullUser
    {
        public int Id { get; set; }
        public string FirebaseId { get; set; }
        public string Email { get; set; }
        public UserProfiles UserProfile { get; set; }
    }
    
}

