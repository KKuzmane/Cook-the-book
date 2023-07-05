

import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-category',
  templateUrl: './recipe-category.component.html',
  styleUrls: ['./recipe-category.component.css']
})
export class RecipeCategoryComponent {
  isHovered = false;
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

  constructor(private recipeService: RecipeService, private router: Router) { }

  fetchRecipes(category: string): void {
    this.router.navigate(['/recipes', category]);
  }
}
