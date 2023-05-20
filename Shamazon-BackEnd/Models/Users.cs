

using System.ComponentModel.DataAnnotations;

namespace Shamazon.Models
{
    public class Users
    {
        public int Id { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Address is required")]
        public string? Address { get; set; }

        [Required(ErrorMessage = "Uid Required")]
        public string FirebaseId { get; set; }
    }

    public class UserCheck
    {
        public int Id { get; set; }
        public string FirebaseId { get;set; }

    }
}
