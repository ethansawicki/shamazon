using Shamazon.Models.OrderControllers;

namespace Shamazon.Repositories.OrderRepositories
{
    public interface IOrdersRepository
    {
        void AddNewOrder(OrderAdd orderAdd);
        List<GetOrders> GetOrders();
    }
}