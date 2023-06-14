using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shamazon.Models.OrderControllers;
using Shamazon.Repositories.OrderRepositories;

namespace Shamazon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderHistoryController : ControllerBase
    {
        private readonly IOrderHistoryRepository _orderHistoryRepository;

        public OrderHistoryController(IOrderHistoryRepository orderHistoryRepository)
        {
            _orderHistoryRepository = orderHistoryRepository;
        }

        [HttpGet("{userId}")]
        public IActionResult Get(int userId)
        {
            var orderItem = _orderHistoryRepository.GetOrderHistoryById(userId);
            if (orderItem == null)
            {
                return NotFound();
            }
            return Ok(orderItem);
        }
        [HttpPost]
        public IActionResult AddNewOrderHistory(AddToOrderHistory orderHistory)
        {
            _orderHistoryRepository.AddOrderHistory(orderHistory);
            return CreatedAtAction("GetLastId", new { id = orderHistory.Id }, orderHistory);
        }
        [HttpGet]
        public IActionResult GetLastId() 
        {
            return Ok(_orderHistoryRepository.GetLastOrderHistory());
        }
    }
}
