using Shamazon.DBUtils;
using Shamazon.Models;
using Shamazon.Models.OrderControllers;

namespace Shamazon.Repositories.OrderRepositories
{
    public class OrderHistoryRepository : BaseRepository, IOrderHistoryRepository
    {
        public OrderHistoryRepository(IConfiguration configuration) : base(configuration) { }
        public List<OrderHistory> GetOrderHistoryById(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT
	                        OH.id as OrderHistoryId, OH.orderNumber, OH.userId,
	                        O.id as OrderId, O.userId, O.orderTotal, O.orderAddress, O.dateCreated,
	                        
	                        OI.OrderId as OrderItemId, OI.ProductId, OI.ProductQuantity
                        FROM OrderHistory as OH
                        JOIN Orders as O ON O.id = OH.orderNumber
                        JOIN OrderItem as OI ON OI.OrderId = O.id
                       
                        WHERE OH.userId = @userId";

                    DbUtils.AddParameter(cmd, "@userId", userId);

                    var reader = cmd.ExecuteReader();

                    var orderItems = new List<OrderHistory>();

                    while (reader.Read())
                    {
                        var orderId = DbUtils.GetInt(reader, "OrderHistoryId");
                        var orderHistory = orderItems.FirstOrDefault(x => x.OrderId == orderId);

                        if (orderHistory == null)
                        {
                            orderHistory = new OrderHistory()
                            {
                                OrderId = DbUtils.GetInt(reader, "OrderId"),
                                OrderTotal = DbUtils.GetDecimal(reader, "OrderTotal"),
                                OrderAddress = DbUtils.GetString(reader, "OrderAddress"),
                                OrderDate = DbUtils.GetDateTime(reader, "dateCreated"),
                                OrderItem = new OrderItem()
                                {
                                    OrderItemId = DbUtils.GetInt(reader, "OrderItemId"),
                                    OrderId = DbUtils.GetInt(reader, "OrderId"),
                                    ProductQuantity = DbUtils.GetInt(reader, "ProductQuantity"),
                                    Products = new List<OrderedProducts>()
                                }   
                            };
                            reader.Close();
                            cmd.CommandText = @"SELECT P.id as ProductId, P.productDescription, P.productImg, P.productName, P.productCategoryId, P.productPrice FROM Products as P";
                            reader = cmd.ExecuteReader();
                            while (reader.Read())
                            {
                                orderHistory.OrderItem.Products.Add(new OrderedProducts()
                                {
                                    Id = DbUtils.GetInt(reader, "ProductId"),
                                    ProductName = DbUtils.GetString(reader, "ProductName"),
                                    ProductDescription = DbUtils.GetString(reader, "productDescription"),
                                    ProductImg = DbUtils.GetString(reader, "productImg"),
                                    ProductPrice = DbUtils.GetDecimal(reader, "productPrice"),
                                });
                            }
                            
                            orderItems.Add(orderHistory);
                        }
                    }
                    reader.Close();
                    return orderItems;
                }
            }
        }
        public void AddOrderHistory (AddToOrderHistory addToOrderHistory)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO OrderHistory (userId, orderNumber)
                        OUTPUT INSERTED.ID
                        VALUES (@userId, @orderNumber)";

                    DbUtils.AddParameter(cmd, "@userId", addToOrderHistory.UserId);
                    DbUtils.AddParameter(cmd, "@orderNumber", addToOrderHistory.OrderNumber);

                    addToOrderHistory.Id = (int)cmd.ExecuteScalar();
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
