using Shamazon.DBUtils;
using Shamazon.Models;

namespace Shamazon.Repositories
{
    public class UserProfilesRepository : BaseRepository, IUserProfilesRepository
    {
        public UserProfilesRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfiles GetUserProfile(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT id, firstName, lastName, address
                        FROM UserProfile
                        WHERE userId = @userId";

                    DbUtils.AddParameter(cmd, "@userId", id);

                    UserProfiles profile = new UserProfiles();

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        profile = new UserProfiles()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            FirstName = DbUtils.GetString(reader, "firstName"),
                            LastName = DbUtils.GetString(reader, "lastName"),
                            Address = DbUtils.GetString(reader, "address")
                        };
                    }
                    reader.Close();
                    return profile;
                }
            }
        }
        public FullUser GetFullUserProfile(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
                            UP.id as UserProfileId,
                            UP.userId,
                            UP.firstName,
                            UP.lastName,
                            UP.address,
                            U.id as UserId,
                            U.email,
                            U.firebaseId,
                            U.displayName
                        FROM UserProfile as UP
                        JOIN Users as U ON UP.userId = U.id
                        WHERE UP.userId = @userId";

                    DbUtils.AddParameter(cmd, "@userId", userId);

                    var reader = cmd.ExecuteReader();

                    FullUser profile = new FullUser();

                    if(reader.Read())
                    {
                        profile = new FullUser()
                        {
                            Id = DbUtils.GetInt(reader, "UserProfileId"),
                            Email = DbUtils.GetString(reader, "email"),
                            FirebaseId = DbUtils.GetString(reader, "firebaseId"),
                            DisplayName = DbUtils.GetString(reader, "displayname"),
                            UserProfile = new UserProfiles()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
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
        public void UpdateUserProfile(UserProfiles profile, int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE UserProfile
                            SET userId = @userid,
                                firstName = @firstname,
                                lastName = @lastname,
                                address = @address
                            WHERE userId = @userId";

                    DbUtils.AddParameter(cmd, "@userid", profile.UserId);
                    DbUtils.AddParameter(cmd, "@firstname", profile.FirstName);
                    DbUtils.AddParameter(cmd, "@lastname", profile.LastName);
                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void AddNewUserProfile(UserProfiles profile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [UserProfile] ([userid],[firstName],[lastName],[address])
                        OUTPUT INSERTED.ID
                        VALUES (@userid, @firstname, @lastname, @address)";

                    DbUtils.AddParameter(cmd, "@userid", profile.UserId);
                    DbUtils.AddParameter(cmd, "@firstname", profile.FirstName);
                    DbUtils.AddParameter(cmd, "@lastname", profile.LastName);
                    DbUtils.AddParameter(cmd, "@address", profile.Address);

                    profile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public LastUserProfileId GetLastUserProfileId()
        {
            using(var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT IDENT_CURRENT('UserProfile') as LastId";
                    var reader = cmd.ExecuteReader();
                    LastUserProfileId lastUserProfileId = new LastUserProfileId();
                    if(DbUtils.IsNotNull(reader, "LastId"))
                    {
                        lastUserProfileId = new LastUserProfileId()
                        {
                            Id = DbUtils.GetInt(reader, "LastId")
                        };
                    }
                    reader.Close();

                    return lastUserProfileId;
                }
            }
        }
        public void DeleteUserProfile(int id)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM [UserProfile] WHERE id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
