using Cook_the_book.Models;
using Cook_the_book.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Cook_the_book.Controllers
{
    [ApiController]
    [Route("api/recipes")]
    public class RecipeController : ControllerBase
    {
        private readonly IRecipeService _recipeService;

        public RecipeController(IRecipeService recipeService)
        {
            _recipeService = recipeService;
        }

        [HttpGet("GetRecipes")]
        public async Task<ActionResult<IEnumerable<Recipe>>> GetRecipes()
        {
            var recipes = await _recipeService.GetAllRecipes();
            return Ok(recipes);
        }

        [HttpGet("GetRecipe/{id}")]
        public async Task<ActionResult<Recipe>> GetRecipe(int id)
        {
            var recipe = await _recipeService.GetRecipeById(id);
            if (recipe == null)
            {
                return NotFound();
            }
            return Ok(recipe);
        }

        [HttpPost("CreateRecipe")]
        public async Task<ActionResult<Recipe>> CreateRecipe(Recipe recipe)
        {
            await _recipeService.CreateRecipe(recipe); // Modified this line
            return CreatedAtAction(nameof(GetRecipe), new { id = recipe.Id }, recipe);
        }

        [HttpPut("UpdateRecipe/{id}")]
        public async Task<IActionResult> UpdateRecipe(int id, Recipe updatedRecipe)
        {
            var success = await _recipeService.UpdateRecipe(id, updatedRecipe);
            if (!success)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("DeleteRecipe/{id}")]
        public async Task<IActionResult> DeleteRecipe(int id)
        {
            var success = await _recipeService.DeleteRecipe(id);
            if (!success)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
