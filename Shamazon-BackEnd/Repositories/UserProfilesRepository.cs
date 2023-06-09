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
                        SELECT id, userId, firstName, lastName, address, displayName
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
                            UserId = DbUtils.GetInt(reader, "userId"),
                            FirstName = DbUtils.GetString(reader, "firstName"),
                            LastName = DbUtils.GetString(reader, "lastName"),
                            Address = DbUtils.GetString(reader, "address"),
                            DisplayName = DbUtils.GetString(reader, "displayName")
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
                                address = @address,
                                displayName = @displayName
                            WHERE userId = @userId";

                    DbUtils.AddParameter(cmd, "@userid", profile.UserId);
                    DbUtils.AddParameter(cmd, "@firstname", profile.FirstName);
                    DbUtils.AddParameter(cmd, "@lastname", profile.LastName);
                    DbUtils.AddParameter(cmd, "@address", profile.Address);
                    DbUtils.AddParameter(cmd, "@displayName", profile.DisplayName);
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
                        INSERT INTO [UserProfile] ([userid],[firstName],[lastName],[address],[displayName])
                        OUTPUT INSERTED.ID
                        VALUES (@userid, @firstname, @lastname, @address, @displayName)";

                    DbUtils.AddParameter(cmd, "@userid", profile.UserId);
                    DbUtils.AddParameter(cmd, "@firstname", profile.FirstName);
                    DbUtils.AddParameter(cmd, "@lastname", profile.LastName);
                    DbUtils.AddParameter(cmd, "@address", profile.Address);
                    DbUtils.AddParameter(cmd, "@displayName", profile.DisplayName);

                    profile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public LastUserProfileId GetLastUserProfileId()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT IDENT_CURRENT('UserProfile') as LastId";
                    var reader = cmd.ExecuteReader();
                    LastUserProfileId lastUserProfileId = new LastUserProfileId();
                    if (DbUtils.IsNotNull(reader, "LastId"))
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
            using (var conn = Connection)
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
