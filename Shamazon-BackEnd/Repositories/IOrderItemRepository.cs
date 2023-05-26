using Shamazon.Models;

namespace Shamazon.Repositories
{
    public interface IOrderItemRepository
    {
        void AddNewOrderItem(AddOrderItem addOrderItem);
        List<GetOrderItem> GetOrderItem();
    }
}