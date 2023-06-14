using Shamazon.DBUtils;
using Shamazon.Models.OrderControllers;

namespace Shamazon.Repositories.OrderRepositories
{
    public class OrderItemRepository : BaseRepository, IOrderItemRepository
    {
        public OrderItemRepository(IConfiguration configuration) : base(configuration) { }

        public void AddNewOrderItem(AddOrderItem addOrderItem)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                cmd.CommandText = @"
                    INSERT INTO OrderItem (OrderId, ProductQuantity, ProductId)
                    OUTPUT INSERTED.ID
                    VALUES (@OrderId, @ProductQuantity, @ProductId)";

                DbUtils.AddParameter(cmd, "@OrderId", addOrderItem.OrderId);
                DbUtils.AddParameter(cmd, "@ProductQuantity", addOrderItem.ProductQuantity);
                DbUtils.AddParameter(cmd, "@ProductId", addOrderItem.ProductId);

                addOrderItem.Id = (int)cmd.ExecuteScalar();
                }
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
