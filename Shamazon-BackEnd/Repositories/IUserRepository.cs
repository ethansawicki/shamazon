using Shamazon.Models;

namespace Shamazon.Repositories
{
    public interface IUserRepository
    {
        void DeleteAccount(int id);
        UserCheck GetUserByFirebaseId(string firebaseId);
        void UpdateUser(Users user);

        void AddNewUser(Users user);

        LastUserId GetLastUser();
        FindUser FindUserByFirebaseId(string firebaseId);
    }
}