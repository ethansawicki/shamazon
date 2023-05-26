using Shamazon.Models;

namespace Shamazon.Repositories
{
    public interface IOrderHistoryRepository
    {
        List<OrderHistory> GetOrderHistoryById(int userId);
    }
}