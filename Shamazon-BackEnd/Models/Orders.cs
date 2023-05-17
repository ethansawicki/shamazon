namespace Shamazon.Models
{
    public class Orders
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public List<Products> ProductId { get; set; }

        public double OrderTotal { get; set; }

        public string OrderAddress { get; set; }

        public DateTime OrderDate { get; set; }
    }
}
