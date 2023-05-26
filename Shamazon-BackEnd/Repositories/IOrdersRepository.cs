using Shamazon.Models;

namespace Shamazon.Repositories
{
    public interface IOrdersRepository
    {
        void AddNewOrder(OrderAdd orderAdd);
        List<GetOrders> GetOrders();
    }
}