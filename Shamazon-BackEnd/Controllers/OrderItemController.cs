using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shamazon.Repositories;

namespace Shamazon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemController : ControllerBase
    {
        private readonly IOrderItemRepository _orderItemRepository;

        public OrderItemController(IOrderItemRepository orderItemRepository)
        {
            _orderItemRepository = orderItemRepository;
        }

        [HttpGet("{userId}")]
        public IActionResult Get(int userId)
        {
            var orderItem = _orderItemRepository.GetOrderItemsById(userId);
            if(orderItem == null)
            {
                return NotFound();
            }
            return Ok(orderItem);
        }
    }
}
