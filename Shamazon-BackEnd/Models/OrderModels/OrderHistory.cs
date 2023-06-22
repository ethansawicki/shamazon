namespace Shamazon.Models.OrderControllers
{
    public class OrderHistory
    {
        public int? OrderId { get; set; }

        public decimal? OrderTotal { get; set; }

        public List<OrderItem> OrderItem { get; set; } = new();

        public string? OrderAddress { get; set; }

        public DateTime? OrderDate { get; set; }
    }

    public class AddToOrderHistory
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int OrderNumber { get; set; }
    }
    public class LastOrderHistory
    {
        public int Id { get; set; }
    }
}
