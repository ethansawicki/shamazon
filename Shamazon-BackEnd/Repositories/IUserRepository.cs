using Shamazon.Models;

namespace Shamazon.Repositories
{
    public interface IUserRepository
    {
        void DeleteAccount(int id);
        UserCheck GetUserByFirebaseId(string firebaseId);
        void Update(Users user);

        void AddNewUser(Users user);
    }
}