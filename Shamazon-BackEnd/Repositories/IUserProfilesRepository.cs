using Shamazon.Models;

namespace Shamazon.Repositories
{
    public interface IUserProfilesRepository
    {
        void AddNewUserProfile(UserProfiles profile);
        void DeleteUserProfile(int id);
        LastUserProfileId GetLastUserProfileId();
        UserProfiles GetUserProfile(int id);
        void UpdateUserProfile(UserProfiles profile, int id);
    }
}