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
                using (var cmd = Connection.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO OrderItem (UserId, OrderTotal, OrderAddress, OrderDate)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @OrderTotal, @OrderAddress, @OrderDate)";

                    DbUtils.AddParameter(cmd, "@UserId", orderAdd.UserId);
                    DbUtils.AddParameter(cmd, "@OrderTotal", orderAdd.OrderTotal);
                    DbUtils.AddParameter(cmd, "@OrderAddress", orderAdd.OrderAddress);
                    DbUtils.AddParameter(cmd, "@OrderDate", orderAdd.OrderDate);

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
    }
}
