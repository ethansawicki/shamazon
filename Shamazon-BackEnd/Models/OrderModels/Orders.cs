namespace Shamazon.Models.OrderControllers
{
    public class Orders
    {
        public int? OrderId { get; set; }

        public decimal? OrderTotal { get; set; }

        public List<OrderItem>? OrderItem { get; set; }

        public string? OrderAddress { get; set; }

        public DateTime? OrderDate { get; set; }
    }

    public class OrderAdd
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public decimal OrderTotal { get; set; }
        public string OrderAddress { get; set; }
        public DateTime OrderDate { get; set; }
    }

    public class GetOrders
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public decimal OrderTotal { get; set; }
        public string OrderAddress { get; set; }
        public DateTime OrderDate { get; set; }
    }

    public class LastOrder
    {
        public int Id { get; set; }
    }
}
