using Cook_the_book.Models;

namespace Cook_the_book.Service.Interfaces
{
    public interface IUserService
    {
        Task<bool> RegisterUser(LoginRequest request);
        Task<string> Login(LoginRequest request);
        Task<User> GetUser(string username);
    }
}
