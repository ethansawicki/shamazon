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
    }
}
