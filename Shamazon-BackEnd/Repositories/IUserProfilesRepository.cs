using Shamazon.Models;

namespace Shamazon.Repositories
{
    public interface IUserProfilesRepository
    {
        UserProfiles GetUserProfile(int id);
    }
}