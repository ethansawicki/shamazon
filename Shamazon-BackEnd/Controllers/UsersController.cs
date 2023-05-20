using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shamazon.Models;
using Shamazon.Repositories;
using System.Net;

namespace Shamazon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetUserByFirebaseId(string firebaseId) 
        {
            var user = _userRepository.GetUserByFirebaseId(firebaseId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult AddNewUser(Users user)
        {
            _userRepository.AddNewUser(user);
            return CreatedAtAction("Get", new { id = user.Id }, user);
        }
    }
}
