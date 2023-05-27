using Shamazon.DBUtils;
using Shamazon.Models;


namespace Shamazon.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public UserCheck GetUserByFirebaseId(string firebaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        select id, firebaseId FROM Users
                        WHERE firebaseId = @firebaseId";

                    DbUtils.AddParameter(cmd, "@firebaseId", firebaseId);

                    var reader = cmd.ExecuteReader();

                    UserCheck userCheck = null;

                    if (reader.Read())
                    {
                        userCheck = new UserCheck()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            FirebaseId = DbUtils.GetString(reader, "firebaseId")
                        };
                    }

                    reader.Close();

                    return userCheck;
                }
            }
        }
        public void UpdateUser(Users user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Users
                            SET Email = @email,
                                firstName = @firstName,
                                lastName = @lastName,
                                Address = @address,
                                firebaseId = @firebaseId
                        WHERE id = @Id";

                    DbUtils.AddParameter(cmd, "@email", user.Email);
                    DbUtils.AddParameter(cmd, "@firstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@lastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@address", user.Address);
                    DbUtils.AddParameter(cmd, "@firebaseId", user.FirebaseId);
                    DbUtils.AddParameter(cmd, "@Id", user.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void DeleteAccount(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM [Users] WHERE id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void AddNewUser(Users user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [Users] ([email],[firebaseId],[firstName],[lastName],[address])
                        OUTPUT INSERTED.ID
                        VALUES (@email, @firebaseId, @firstName, @lastName, @address)";

                    DbUtils.AddParameter(cmd, "@email", user.Email);
                    DbUtils.AddParameter(cmd, "@firebaseId", user.FirebaseId);
                    DbUtils.AddParameter(cmd, "@firstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@lastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@address", user.Address);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public LastUserId GetLastUser()
        {
            using (var conn = Connection)
            {
                conn.Open ();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT IDENT_CURRENT('Users') as [LastUSERId]";

                    var reader = cmd.ExecuteReader();
                    LastUserId lastUserId = new LastUserId();
                   if(DbUtils.IsNotNull(reader, "LastUSERId"))
                    {
                        lastUserId = new LastUserId()
                        {
                            Id = DbUtils.GetInt(reader, "LastUserId"),
                        };
                    }
                   reader.Close();

                    return lastUserId;
                }
            }
        }
    }
}
