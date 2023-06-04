using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using FirebaseAdmin;
using Microsoft.AspNetCore.Mvc;
using Shamazon.Models;
using Shamazon.Repositories;
using System.Net;
using FirebaseAdmin.Auth;

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

        [Authorize, HttpGet("userCheck/{firebaseId}")]
        public IActionResult GetUserByFirebaseId(string firebaseId) 
        {
            var user = _userRepository.GetUserByFirebaseId(firebaseId);
            if (user == null)
            {
                return NotFound();
            } 
            else if(firebaseId == user.FirebaseId)
            {
                return BadRequest();
            }
            return Ok(user);
        }

        [Authorize, HttpGet("finduser/{firebaseId}")]
        public IActionResult FindUserByFirebaseId(string firebaseId)
        {
            var user = _userRepository.FindUserByFirebaseId(firebaseId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [Authorize, HttpPost]
        public IActionResult AddNewUser(Users user)
        {
            _userRepository.AddNewUser(user);
            return CreatedAtAction("GetLastUserId", new { id = user.Id }, user);
        }
        [HttpDelete]
        public IActionResult DeleteUser(int id) 
        {
            _userRepository.DeleteAccount(id);
            return NoContent();
        }
        [HttpPut("{id}")]
        public IActionResult UpdateUser(Users user, int id)
        {
            if(id != user.Id)
            {
                return BadRequest();
            }
            _userRepository.UpdateUser(user);
            return NoContent();
        }
        [HttpGet]
        public IActionResult GetLastUserId() 
        { 
            return Ok(_userRepository.GetLastUser());
        }
    }
}
