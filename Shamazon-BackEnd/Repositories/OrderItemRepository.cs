using Shamazon.DBUtils;
using Shamazon.Models;

namespace Shamazon.Repositories
{
    public class OrderItemRepository : BaseRepository
    {
        public OrderItemRepository(IConfiguration configuration) : base(configuration) { }

        public List<OrderItem> GetOrderItemsById(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT
                            OrderItem.id, OrderItem.OrderId, OrderItem.ProductId, OrderItem.ProductQuantity
                        FROM OrderItem as OrderItem
                        JOIN Orders as Orders ON Orders.id = OrderItem.OrderId
                        JOIN Products as Products ON Products.id = OrderItem.ProductId
                        WHERE Orders.userId = @userId";

                    DbUtils.AddParameter(cmd, "@userId", userId);

                    var reader = cmd.ExecuteReader();

                    var orderItems = new List<OrderItem>();

                    while (reader.Read())
                    {
                        orderItems.Add(new OrderItem()
                        {
                            OrderItemId = DbUtils.GetInt(reader, "id"),
                            OrderId = DbUtils.GetInt(reader, "OrderId"),
                            ProductQuanity = DbUtils.GetInt(reader, "ProductQuantity"),
                            Products = new List<Products>()
                        });

                    }

                    reader.Close();

                    return orderItems;
                }
            }
        }
    }
}
