using Shamazon.Models;

namespace Shamazon.Repositories
{
    public interface IOrderItemRepository
    {
        void AddNewOrder(AddOrderItem addOrderItem);
        List<GetOrderItem> GetOrders();
    }
}