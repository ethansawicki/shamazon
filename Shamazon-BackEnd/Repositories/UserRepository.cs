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
        public FindUser FindUserByFirebaseId(string firebaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        select id, firebaseId, displayName, email FROM Users
                        WHERE firebaseId = @firebaseId";

                    DbUtils.AddParameter(cmd, "@firebaseId", firebaseId);

                    var reader = cmd.ExecuteReader();

                    FindUser findUser = new FindUser();

                    if (reader.Read())
                    {
                        findUser = new FindUser()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            FirebaseId = DbUtils.GetString(reader, "firebaseId"),
                            DisplayName = DbUtils.GetString(reader, "displayName"),
                            Email = DbUtils.GetString(reader, "email")
                        };
                    }

                    reader.Close();

                    return findUser;
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
                                displayName = @displayName,
                                Address = @address,
                                firebaseId = @firebaseId
                        WHERE id = @Id";

                    DbUtils.AddParameter(cmd, "@email", user.Email);
                    DbUtils.AddParameter(cmd, "@displayName", user.DisplayName);
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
                        INSERT INTO [Users] ([email],[firebaseId],[displayName])
                        OUTPUT INSERTED.ID
                        VALUES (@email, @firebaseId, @displayName)";

                    DbUtils.AddParameter(cmd, "@email", user.Email);
                    DbUtils.AddParameter(cmd, "@firebaseId", user.FirebaseId);
                    DbUtils.AddParameter(cmd, "@displayName", user.DisplayName);

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
