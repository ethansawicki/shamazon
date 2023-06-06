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
                        select id, firebaseId, email FROM Users
                        WHERE firebaseId = @firebaseId";

                    DbUtils.AddParameter(cmd, "@firebaseId", firebaseId);

                    var reader = cmd.ExecuteReader();

                    UserCheck userCheck = null;

                    if (reader.Read())
                    {
                        userCheck = new UserCheck()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            FirebaseId = DbUtils.GetString(reader, "firebaseId"),
                            Email = DbUtils.GetString(reader, "email")
                        };
                    }

                    reader.Close();

                    return userCheck;
                }
            }
        }
        public Users FindUserByFirebaseId(string firebaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        select id, firebaseId, email FROM Users
                        WHERE firebaseId = @firebaseId";

                    DbUtils.AddParameter(cmd, "@firebaseId", firebaseId);

                    var reader = cmd.ExecuteReader();

                    Users findUser = new Users();

                    if (reader.Read())
                    {
                        findUser = new Users()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            FirebaseId = DbUtils.GetString(reader, "firebaseId"),
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
                                displayName = @displayName,
                                firebaseId = @firebaseId
                        WHERE id = @Id";

                    DbUtils.AddParameter(cmd, "@firebaseId", user.FirebaseId);
                    DbUtils.AddParameter(cmd, "@Id", user.Id);
                    DbUtils.AddParameter(cmd, "@email", user.Email);

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
                        INSERT INTO [Users] ([firebaseId])
                        OUTPUT INSERTED.ID
                        VALUES (@firebaseId)";

                    DbUtils.AddParameter(cmd, "@firebaseId", user.FirebaseId);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public LastUserId GetLastUser()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT IDENT_CURRENT('Users') as [LastUSERId]";

                    var reader = cmd.ExecuteReader();
                    LastUserId lastUserId = new LastUserId();
                    if (DbUtils.IsNotNull(reader, "LastUSERId"))
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
        public FullUser GetFullUserProfile(string firebaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
                            U.id as UserId,
                            U.firebaseId,
                            U.email,
                            UP.id as UserProfileId,
                            UP.userId as userprofId,
                            UP.firstName,
                            UP.lastName,
                            UP.displayName,
                            UP.address
                        FROM Users as U
                        JOIN UserProfile as UP ON UP.userId = U.id
                        WHERE U.firebaseId = @firebaseId";

                    DbUtils.AddParameter(cmd, "@firebaseId", firebaseId);

                    var reader = cmd.ExecuteReader();

                    FullUser profile = new FullUser();

                    if (reader.Read())
                    {
                        profile = new FullUser()
                        {
                            Id = DbUtils.GetInt(reader, "UserId"),
                            FirebaseId = DbUtils.GetString(reader, "firebaseId"),
                            Email = DbUtils.GetString(reader, "email"),
                            UserProfile = new UserProfiles()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                DisplayName = DbUtils.GetString(reader, "displayname"),
                                UserId = DbUtils.GetInt(reader, "userprofId"),
                                FirstName = DbUtils.GetString(reader, "firstName"),
                                LastName = DbUtils.GetString(reader, "lastName"),
                                Address = DbUtils.GetString(reader, "address")
                            }
                        };
                    }
                    reader.Close();

                    return profile;
                }
            }
        }
    }
}
