using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shamazon.Repositories;

namespace Shamazon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsRepository _productsRepository;

        public ProductsController(IProductsRepository productsRepository)
        {
            _productsRepository = productsRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_productsRepository.GetAllProducts());
        }
    }
}
