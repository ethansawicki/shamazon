using Shamazon.Models;

namespace Shamazon.Repositories
{
    public interface IUserProfilesRepository
    {
        UserProfiles GetUserProfile(int id);
        FullUser GetFullUserProfile(int userId);
        void AddNewUserProfile(UserProfiles profile);
        public LastUserProfileId GetLastUserProfileId();
        void DeleteUserProfile(int id);
        void UpdateUserProfile(UserProfiles profile, int id);
    }
}