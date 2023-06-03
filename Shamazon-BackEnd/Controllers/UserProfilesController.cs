using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        [Authorize, HttpGet("userprofile/{userId}")]
        public IActionResult Get(int userId) 
        {
            var userProfile = _userProfilesRepository.GetUserProfile(userId);
            if(userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }
    }
}
