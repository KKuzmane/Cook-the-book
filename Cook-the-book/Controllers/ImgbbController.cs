using Microsoft.AspNetCore.Mvc;
using Cook_the_book.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace Cook_the_book.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImgbbController : ControllerBase
    {
        private readonly IImgbbService _imgbbService;

        public ImgbbController(IImgbbService imgbbService)
        {
            _imgbbService = imgbbService;
        }

        [HttpPost("UploadPhoto")]
        [Authorize]
        public async Task<IActionResult> UploadPhoto(IFormFile photo)
        {
            try
            {
                var imageUrl = await _imgbbService.UploadPhoto(photo);
                return Ok(imageUrl);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

    }
}
