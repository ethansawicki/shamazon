using Shamazon.DBUtils;
using Shamazon.Models;

namespace Shamazon.Repositories
{
    public class OrderItemRepository : BaseRepository, IOrderItemRepository
    {
        public OrderItemRepository(IConfiguration configuration) : base(configuration) { }

        public void AddNewOrderItem(AddOrderItem addOrderItem)
        {
            using (var cmd = Connection.CreateCommand())
            {
                cmd.CommandText = @"
                    INSERT INTO OrderItem (ProductQuantity, ProductId)
                    OUTPUT INSERTED.ID
                    VALUES (@ProductQuantity, @ProductId)";

                DbUtils.AddParameter(cmd, "@ProductQuantity", addOrderItem.ProductQuantity);
                DbUtils.AddParameter(cmd, "@ProductId", addOrderItem.ProductId);

                addOrderItem.OrderItemId = (int)cmd.ExecuteScalar();
            }
        }

        public List<GetOrderItem> GetOrderItem()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
                            id, OrderId, ProductId, ProductQuantity
                        FROM OrderItem";
                    var reader = cmd.ExecuteReader();

                    var orderItem = new List<GetOrderItem>();
                    while (reader.Read())
                    {
                        orderItem.Add(new GetOrderItem()
                        {
                            OrderItemId = DbUtils.GetInt(reader, "id"),
                            OrderId = DbUtils.GetInt(reader, "OrderId"),
                            ProductId = DbUtils.GetInt(reader, "ProductId"),
                            ProductQuantity = DbUtils.GetInt(reader, "ProductQuantity")
                        });
                    }
                    reader.Close();

                    return orderItem;
                }
            }
        }
    }
}
