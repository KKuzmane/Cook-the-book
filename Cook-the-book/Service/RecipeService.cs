using Cook_the_book.Data;
using Cook_the_book.Models;
using Cook_the_book.Service.Interfaces;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        public async Task CreateRecipe(Recipe recipe)
        {
            try
            {
                int newId = await GetNextRecipeId();
                recipe.Id = newId;
                await _recipeCollection.InsertOneAsync(recipe);
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
    }
}
