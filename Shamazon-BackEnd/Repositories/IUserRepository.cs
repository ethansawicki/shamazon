using Shamazon.Models;

namespace Shamazon.Repositories
{
    public interface IUserRepository
    {
        void AddNewUser(Users user);
        void DeleteAccount(string id);
        Users FindUserByFirebaseId(string firebaseId);
        FullUser GetFullUserProfile(string firebaseId);
        LastUserId GetLastUser();
        UserCheck GetUserByFirebaseId(string firebaseId);
        void UpdateUser(Users user);
    }
}