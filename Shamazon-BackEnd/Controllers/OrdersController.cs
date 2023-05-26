using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shamazon.Models;
using Shamazon.Repositories;

namespace Shamazon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrdersRepository _ordersRepository;

        public OrdersController(IOrdersRepository ordersRepository)
        {
            _ordersRepository = ordersRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_ordersRepository.GetOrders());    
        }
        [HttpPost]
        public IActionResult Post(OrderAdd orderAdd)
        {
            _ordersRepository.AddNewOrder(orderAdd);
            return CreatedAtAction("Get", new { id = orderAdd.Id }, orderAdd);
        }
    }
}
