import { Component } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-category',
  templateUrl: './recipe-category.component.html',
  styleUrls: ['./recipe-category.component.css']
})
export class RecipeCategoryComponent {
  categories: any[] = [
    {
      category: 'Meat Food',
      imageSrc: 'assets/images/foodCategories/meat_food_image.jpg',
      text: 'Meat Food'
    },
    {
      category: 'Desserts',
      imageSrc: 'assets/images/foodCategories/desserts_image.jpg',
      text: 'Desserts'
    },
    {
      category: 'Veganic',
      imageSrc: 'assets/images/foodCategories/veganic_image.jpg',
      text: 'Veganic'
    },
    {
      category: 'Grilled',
      imageSrc: 'assets/images/foodCategories/grilled_image.jpg',
      text: 'Grilled'
    },
    {
      category: 'Salads',
      imageSrc: 'assets/images/foodCategories/salads_image.jpg',
      text: 'Salads'
    },
    {
      category: 'Best Choice',
      imageSrc: 'assets/images/foodCategories/best_choice_image.jpg',
      text: 'Best Choice'
    }
  ];

  isHovered = false;

  constructor(private recipeService: RecipeService) { }

  fetchRecipes(category: string): void {
    this.recipeService.getCategory(category)
      .subscribe(
        (recipes: Recipe[]) => {
          console.log(recipes);
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
}
