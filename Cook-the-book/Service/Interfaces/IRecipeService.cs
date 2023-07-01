﻿using Cook_the_book.Models;

namespace Cook_the_book.Service.Interfaces
{
    public interface IRecipeService
    {
        Task<List<Recipe>> GetAllRecipes();
        Task<Recipe> GetRecipeById(int id);
        Task CreateRecipe(Recipe recipe);
        Task<bool> UpdateRecipe(int id, Recipe updatedRecipe);
        Task<bool> DeleteRecipe(int id);
    }
}
