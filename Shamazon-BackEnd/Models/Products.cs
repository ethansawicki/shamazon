namespace Shamazon.Models
{
    public class Products
    {
        public int Id { get; set; }

        public string ProductName { get; set; }

        public decimal ProductPrice { get; set; }
        
        public ProductsCategory ProductsCategory { get; set; }

        public string ProductDescription { get; set; }

        public int ProductQuantity { get; set; }

        public string ProductImg { get; set; }
    }

    public class OrderedProducts
    {
        public int Id { get; set; }

        public string ProductName { get; set; }

        public decimal ProductPrice { get; set; }

        public ProductsCategory ProductsCategory { get; set; }

        public string ProductDescription { get; set; }

        public string ProductImg { get; set; }
    }
}
