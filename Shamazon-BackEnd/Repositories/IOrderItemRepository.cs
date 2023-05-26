using Shamazon.Models;

namespace Shamazon.Repositories
{
    public interface IOrderItemRepository
    {
        List<OrderItem> GetOrderItemsById(int userId);
    }
}