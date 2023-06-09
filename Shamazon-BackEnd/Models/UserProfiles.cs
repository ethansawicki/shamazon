using System.ComponentModel.DataAnnotations;

namespace Shamazon.Models
{
    public class UserProfiles
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string DisplayName { get; set; }

    }
    public class LastUserProfileId
    {
        public int Id { get; set; }
    }
}
