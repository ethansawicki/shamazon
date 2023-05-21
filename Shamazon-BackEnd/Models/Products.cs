namespace Shamazon.Models
{
    public class Products
    {
        public int Id { get; set; }

        public string ProductName { get; set; }

        public double ProductPrice { get; set; }

        public string ProductDescription { get; set; }

        public int ProductQuantity { get; set; }

        public string ProductImg { get; set; }
    }

    public class ProductsCategory
    {
        public int ProductCategoryId { get; set; }

        public string ProductCategoryName { get; set; }
    }
}
