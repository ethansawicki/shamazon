using Shamazon.Models;

namespace Shamazon.Repositories
{
    public interface IProductsRepository
    {
        List<Products> GetAllProducts();
    }
}