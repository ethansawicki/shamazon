using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shamazon.Models;
using Shamazon.Repositories;

namespace Shamazon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemsController : ControllerBase
    {
        private readonly IOrderItemRepository _orderItemRepository;

        public OrderItemsController(IOrderItemRepository orderItemRepository)
        {
            _orderItemRepository = orderItemRepository;
        }

        [HttpPost]
        public IActionResult AddNewOrderItem(AddOrderItem addOrderItem)
        {
            _orderItemRepository.AddNewOrderItem(addOrderItem);
            return CreatedAtAction("Get", new { id = addOrderItem.OrderItemId }, addOrderItem);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_orderItemRepository.GetOrderItem());
        }
    }
}
