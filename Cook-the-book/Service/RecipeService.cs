using Cook_the_book.Data;
using Cook_the_book.Service.Interfaces;
using MongoDB.Driver;
using System.Globalization;
using System.Text;

namespace Cook_the_book.Service
{
    public class RecipeService : IRecipeService
    {
        private readonly IMongoCollection<Recipe> _recipeCollection;
        private readonly ILogger<RecipeService> _logger;

        public RecipeService(AppDbContext dbContext, ILogger<RecipeService> logger)
        {
            _recipeCollection = dbContext.Recipes;
            _logger = logger;
        }

        public async Task<List<Recipe>> GetAllRecipes()
        {
            try
            {
                return await _recipeCollection.Find(_ => true).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred while getting all recipes: {ex.Message}");
                throw;
            }
        }

        public async Task<Recipe> GetRecipeById(int id)
        {
            try
            {
                return await _recipeCollection.Find(r => r.Id == id).FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred while getting the recipe with ID {id}: {ex.Message}");
                throw;
            }
        }

        public async Task<int> CreateRecipe(Recipe recipe)
        {
            try
            {
                int newId = await GetNextRecipeId();
                recipe.Id = newId;
                await _recipeCollection.InsertOneAsync(recipe);
                return newId;
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred while creating the recipe: {ex.Message}");
                throw;
            }
        }

        public async Task<bool> UpdateRecipe(int id, Recipe updatedRecipe)
        {
            try
            {
                var result = await _recipeCollection.ReplaceOneAsync(r => r.Id == id, updatedRecipe);
                return result.ModifiedCount > 0;
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred while updating the recipe with ID {id}: {ex.Message}");
                throw;
            }
        }

        public async Task<bool> DeleteRecipe(int id)
        {
            try
            {
                var result = await _recipeCollection.DeleteOneAsync(r => r.Id == id);
                return result.DeletedCount > 0;
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred while deleting the recipe with ID {id}: {ex.Message}");
                throw;
            }
        }

        private async Task<int> GetNextRecipeId()
        {
            var maxRecipe = await _recipeCollection.Find(_ => true)
                .SortByDescending(r => r.Id)
                .FirstOrDefaultAsync();

            if (maxRecipe == null)
            {
                return 1;
            }
            else
            {
                return maxRecipe.Id + 1;
            }
        }

        public async Task<List<Recipe>> GetRecipesFromCategory(string category)
        {
            try
            {
                var filter = Builders<Recipe>.Filter.ElemMatch(x => x.Categories, c => c.Name == category);
                var recipes = await _recipeCollection.Find(filter).ToListAsync();
                return recipes;
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred while getting the category with name {category}: {ex.Message}");
                throw;
            }
        }

        public async Task<List<Recipe>> SearchRecipe(string query)
        {
            try
            {
                // Normalize the query using the RemoveDiacritics method
                string normalizedQuery = RemoveDiacritics(query);

                // Fetch all recipes from the database
                var allRecipes = await _recipeCollection.Find(_ => true).ToListAsync();

                // Search for the matching recipes
                List<Recipe> searchResults = allRecipes
                    .Where(recipe => recipe.Name != null &&
                        RemoveDiacritics(recipe.Name).Contains(normalizedQuery, StringComparison.OrdinalIgnoreCase))
                    .Take(5) // Limit the search results to 5 recipes
                    .ToList();

                return searchResults;
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred while searching for recipes with query {query}: {ex.Message}");
                throw;
            }
        }


        #region Helpers
        private string RemoveDiacritics(string text)
        {
            var normalizedText = text.Normalize(NormalizationForm.FormKD);
            var builder = new StringBuilder();

            foreach (var c in normalizedText)
            {
                if (CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
                    builder.Append(c);
            }

            return builder.ToString();
        }
        #endregion
    }
}
