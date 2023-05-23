namespace Shamazon.Models
{
    public class OrderItem
    {
        public int OrderItemId { get; set; }

        public int OrderId { get; set; }

        public List<Products> Products { get; set; }

        public int ProductQuanity { get; set; }
    }
}
