using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shamazon.Models;
using Shamazon.Repositories;

namespace Shamazon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfilesController : ControllerBase
    {
        private readonly IUserProfilesRepository _userProfilesRepository;

        public UserProfilesController(IUserProfilesRepository userProfilesRepository)
        {
            _userProfilesRepository = userProfilesRepository;
        }

        [HttpGet("userprofile/{userId}")]
        public IActionResult Get(int userId) 
        {
            var userProfile = _userProfilesRepository.GetUserProfile(userId);
            if(userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }
        [HttpGet]
        public IActionResult GetLastId()
        {
            return Ok(_userProfilesRepository.GetLastUserProfileId());
        }
        [HttpPost]
        public IActionResult AddNewProfile(UserProfiles profile)
        {
            _userProfilesRepository.AddNewUserProfile(profile);
            return CreatedAtAction("GetLastId", new { id = profile.Id }, profile);
        }
        [HttpDelete]
        public IActionResult DeleteProfile(int id)
        {
            _userProfilesRepository.DeleteUserProfile(id);
            return NoContent();
        }
        [HttpPut("{id}")]
        public IActionResult UpdateUserProfile(UserProfiles profile, int id)
        {
            if(id != profile.Id)
            {
                return BadRequest();
            }
            _userProfilesRepository.UpdateUserProfile(profile, id);
            return NoContent();
        }
    }
}
