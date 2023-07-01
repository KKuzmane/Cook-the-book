using Cook_the_book.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Configuration;

namespace Cook_the_book.Data
{
    public class AppDbContext
    {
        private readonly IMongoDatabase _database;

        public AppDbContext(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("AppDbContext");
            var databaseName = "CookingDB";
            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(databaseName);
        }

        public IMongoCollection<Recipe> Recipes => _database.GetCollection<Recipe>("Recipes");
    }
}
