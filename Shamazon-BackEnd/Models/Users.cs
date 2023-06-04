

using System.ComponentModel.DataAnnotations;

namespace Shamazon.Models
{
    public class Users
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }
        public string FirebaseId { get; set; }
        public string DisplayName { get; set; }
    }

    public class UserCheck
    {
        public int Id { get; set; }
        public string FirebaseId { get;set; }

    }
    public class LastUserId
    {
        public int Id { get; set; }
    }
    public class FindUser
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }
        public string FirebaseId { get; set; }
        public string Email { get; set; }
    }
}
