using Shamazon.DBUtils;
using Shamazon.Models.OrderControllers;

namespace Shamazon.Repositories.OrderRepositories
{
    public class OrdersRepository : BaseRepository, IOrdersRepository
    {
        public OrdersRepository(IConfiguration configuration) : base(configuration) { }
        public void AddNewOrder(OrderAdd orderAdd)
        {
            using (var conn = Connection)
            { 
                conn.Open(); 
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Orders (userId, orderTotal, orderAddress, dateCreated)
                        OUTPUT INSERTED.ID
                        VALUES (@userId, @orderTotal, @orderAddress, @dateCreated)";

                    DbUtils.AddParameter(cmd, "@userId", orderAdd.UserId);
                    DbUtils.AddParameter(cmd, "@orderTotal", orderAdd.OrderTotal);
                    DbUtils.AddParameter(cmd, "@orderAddress", orderAdd.OrderAddress);
                    DbUtils.AddParameter(cmd, "@dateCreated", orderAdd.OrderDate);

                    orderAdd.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<GetOrders> GetOrders()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
                            id, userId, orderTotal, orderAddress, dateCreated
                        FROM Orders";
                    var reader = cmd.ExecuteReader();

                    var orders = new List<GetOrders>();
                    while (reader.Read())
                    {
                        orders.Add(new GetOrders()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            OrderTotal = DbUtils.GetDecimal(reader, "orderTotal"),
                            OrderAddress = DbUtils.GetString(reader, "orderAddress"),
                            OrderDate = DbUtils.GetDateTime(reader, "dateCreated")
                        });
                    }
                    reader.Close();
                    return orders;
                }
            }
        }
        public LastOrderHistory GetLastOrderHistory()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT IDENT_CURRENT('Orderhistory') as LastId";
                    var reader = cmd.ExecuteReader();
                    LastOrderHistory lastUserProfileId = new LastOrderHistory();
                    if (DbUtils.IsNotNull(reader, "LastId"))
                    {
                        lastUserProfileId = new LastOrderHistory()
                        {
                            Id = DbUtils.GetInt(reader, "LastId")
                        };
                    }
                    reader.Close();

                    return lastUserProfileId;
                }
            }
        }
    }
}
