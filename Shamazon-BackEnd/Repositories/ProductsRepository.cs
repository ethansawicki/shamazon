using Shamazon.DBUtils;
using Shamazon.Models;

namespace Shamazon.Repositories
{
    public class ProductsRepository : BaseRepository, IProductsRepository
    {
        public ProductsRepository(IConfiguration configuration) : base(configuration) { }

        public List<Products> GetAllProducts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
                            P.id as ProductId, 
                            P.productName, 
                            P.productPrice, 
                            P.productQuantity, 
                            P.productDescription, 
                            P.productImg,
                            PC.id ProductCategoryId,
                            PC.categoryName
                        FROM Products P
                        JOIN productCategory as PC 
                        ON P.productCategoryId = PC.id";

                    var reader = cmd.ExecuteReader();
                    var products = new List<Products>();
                    while (reader.Read())
                    {
                        products.Add(new Products()
                        {
                            Id = DbUtils.GetInt(reader, "ProductId"),
                            ProductName = DbUtils.GetString(reader, "productName"),
                            ProductPrice = DbUtils.GetDecimal(reader, "productPrice"),
                            ProductsCategory = new ProductsCategory()
                            {
                                ProductCategoryId = DbUtils.GetInt(reader, "ProductCategoryId"),
                                ProductCategoryName = DbUtils.GetString(reader, "categoryName")
                            },
                            ProductDescription = DbUtils.GetString(reader, "productDescription"),
                            ProductQuantity = DbUtils.GetInt(reader, "productQuantity"),
                            ProductImg = DbUtils.GetString(reader, "productImg")
                        });
                    }
                    reader.Close();

                    return products;
                }
            }
        }
        public Products GetSpecificProduct(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
                            P.id as ProductId, 
                            P.productName, 
                            P.productPrice, 
                            P.productQuantity, 
                            P.productDescription, 
                            P.productImg,
                            PC.id ProductCategoryId,
                            PC.categoryName
                        FROM Products P
                        JOIN productCategory as PC 
                        ON P.productCategoryId = PC.id
                        WHERE P.id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();
                    Products product = new Products();
                    if (reader.Read())
                    {
                        product = new Products()
                        {
                            Id = DbUtils.GetInt(reader, "ProductId"),
                            ProductName = DbUtils.GetString(reader, "productName"),
                            ProductPrice = DbUtils.GetDecimal(reader, "productPrice"),
                            ProductsCategory = new ProductsCategory()
                            {
                                ProductCategoryId = DbUtils.GetInt(reader, "ProductCategoryId"),
                                ProductCategoryName = DbUtils.GetString(reader, "categoryName")
                            },
                            ProductDescription = DbUtils.GetString(reader, "productDescription"),
                            ProductQuantity = DbUtils.GetInt(reader, "productQuantity"),
                            ProductImg = DbUtils.GetString(reader, "productImg")
                        };
                    }
                    reader.Close();

                    return product;
                }
            }
        }
    }
}
