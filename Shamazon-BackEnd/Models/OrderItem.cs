namespace Shamazon.Models
{
    public class OrderItem
    {
        public int OrderItemId { get; set; }

        public int OrderId { get; set; }

        public List<OrderedProducts>? Products { get; set; }

        public int ProductQuantity { get; set; }
    }

    public class GetOrderItem
    {
        public int OrderItemId { get; set; }

        public int OrderId { get; set; }

        public int ProductId { get; set; }
        public int ProductQuantity { get; set;}
    }

    public class AddOrderItem
    {
        public int OrderItemId { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int ProductQuantity { get; set; }
    }
}
