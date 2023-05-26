using Shamazon.Models.OrderControllers;

namespace Shamazon.Repositories.OrderRepositories
{
    public interface IOrderItemRepository
    {
        void AddNewOrderItem(AddOrderItem addOrderItem);
        List<GetOrderItem> GetOrderItem();
    }
}