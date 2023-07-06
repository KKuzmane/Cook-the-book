using System;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Cook_the_book.Data;
using Cook_the_book.Models;
using Cook_the_book.Service.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;

namespace Cook_the_book.Service
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public UserService(AppDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        public async Task<bool> RegisterUser(LoginRequest request)
        {
            try
            {
                var existingUser = await _dbContext.Users.Find(u => u.Username == request.Username).FirstOrDefaultAsync();
                if (existingUser != null)
                {
                    return false;
                }

                string passwordHash = HashPassword(request.Password);
                var user = new User
                {
                    Username = request.Username,
                    PasswordHash = passwordHash
                };

                await _dbContext.Users.InsertOneAsync(user);
                return true;
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                return false;
            }
        }

        public async Task<string> Login(LoginRequest request)
        {
            try
            {
                var user = await _dbContext.Users.Find(u => u.Username == request.Username).FirstOrDefaultAsync();
                if (user == null)
                {
                    return null;
                }

                if (!VerifyPassword(request.Password, user.PasswordHash))
                {
                    return null;
                }

                var token = GenerateJwtToken(user.Username);
                return token;
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                return null;
            }
        }

        public async Task<User> GetUser(string username)
        {
            try
            {
                var user = await _dbContext.Users.Find(u => u.Username == username).FirstOrDefaultAsync();
                if (user == null)
                {
                    return null;
                }

                user.PasswordHash = null;

                return user;
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                return null;
            }
        }

        private bool VerifyPassword(string password, string passwordHash)
        {
            string hashedPassword = HashPassword(password);
            return string.Equals(hashedPassword, passwordHash);
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }

        private string GenerateJwtToken(string username)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: new[] { new Claim(ClaimTypes.Name, username) },
                expires: DateTime.Now.AddDays(7),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
