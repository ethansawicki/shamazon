using Shamazon.Models.OrderControllers;

namespace Shamazon.Repositories.OrderRepositories
{
    public interface IOrderHistoryRepository
    {
        List<OrderHistory> GetOrderHistoryById(int userId);
    }
}