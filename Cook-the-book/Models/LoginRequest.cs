using System.ComponentModel.DataAnnotations;

namespace Cook_the_book.Models
{
    public class LoginRequest
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
