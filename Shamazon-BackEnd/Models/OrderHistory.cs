namespace Shamazon.Models
{
    public class OrderHistory
    {
        public int? OrderId { get; set; }

        public decimal? OrderTotal { get; set; }

        public List<OrderItem>? OrderItem { get; set; }

        public string? OrderAddress { get; set; }

        public DateTime? OrderDate { get; set; }
    }
}
