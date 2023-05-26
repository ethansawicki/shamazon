using Shamazon.DBUtils;
using Shamazon.Models;

namespace Shamazon.Repositories
{
    public class OrderItemRepository : BaseRepository, IOrderItemRepository
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
                            OrderItem.id, OrderItem.OrderId, OrderItem.ProductId, OrderItem.ProductQuantity,
                            Products.id as ProductId, Products.productName, Products.productPrice, Products.productDescription,
                            Products.productImg
                        FROM OrderItem as OrderItem
                        JOIN Orders as Orders ON Orders.id = OrderItem.OrderId
                        JOIN Products as Products ON Products.id = OrderItem.ProductId
                        WHERE Orders.userId = @userId";

                    DbUtils.AddParameter(cmd, "@userId", userId);

                    var reader = cmd.ExecuteReader();

                    var orderItems = new List<OrderItem>();

                    while (reader.Read())
                    {
                        var orderId = DbUtils.GetInt(reader, "id");
                        var existingOrders = orderItems.FirstOrDefault(x => x.OrderItemId == orderId);

                        if (existingOrders == null)
                        {
                            existingOrders = new OrderItem()
                            {
                                OrderItemId = DbUtils.GetInt(reader, "id"),
                                OrderId = DbUtils.GetInt(reader, "OrderId"),
                                ProductQuanity = DbUtils.GetInt(reader, "ProductQuantity"),
                                Products = new List<Products>()
                            };
                        }

                        orderItems.Add(existingOrders);

                        existingOrders.Products.Add(new Products()
                        {
                            Id = DbUtils.GetInt(reader, "ProductId"),
                            ProductName = DbUtils.GetString(reader, "productName"),
                            ProductImg = DbUtils.GetString(reader, "productImg"),
                            ProductDescription = DbUtils.GetString(reader, "productDescription"),
                            ProductPrice = DbUtils.GetDecimal(reader, "productPrice")
                        });
                    }

                    reader.Close();

                    return orderItems;
                }
            }
        }
    }
}
