import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  newRecipe: Recipe = {
    id: 0,
    name: '',
    ingredients: '',
    instructions: '',
    pictures: [],
    keywords: []
  };

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.recipeService.getRecipes().subscribe(
      recipes => {
        this.recipes = recipes;
      },
      error => {
        console.error('Error fetching recipes:', error);
      }
    );
  }

  onSubmit(): void {
    this.recipeService.createRecipe(this.newRecipe).subscribe(
      recipe => {
        console.log('Recipe created:', recipe);
        this.newRecipe = {
          id: 0,
          name: '',
          ingredients: '',
          instructions: '',
          pictures: [],
          keywords: []
        };
        this.loadRecipes();
      },
      error => {
        console.error('Error creating recipe:', error);
      }
    );
  }

  editRecipe(recipe: Recipe): void {
    // Implement the logic to edit a recipe (optional)
    // For example, you can redirect the user to a different component with the recipe ID as a parameter
    // For example, this.router.navigate(['/edit-recipe', recipe.id]);
  }

  deleteRecipe(id: number): void {
    this.recipeService.deleteRecipe(id).subscribe(
      () => {
        console.log('Recipe deleted');
        this.loadRecipes();
      },
      error => {
        console.error('Error deleting recipe:', error);
      }
    );
  }
}
