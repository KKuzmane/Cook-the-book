

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
      category: 'Main',
      imageSrc: 'assets/images/foodCategories/main_food_image.jpg',
      text: 'Pamatēdieni'
    },
    {
      category: 'Soups',
      imageSrc: 'assets/images/foodCategories/soups_image.jpg',
      text: 'Zupas'
    },
    {
      category: 'Sweets',
      imageSrc: 'assets/images/foodCategories/desserts_image.jpg',
      text: 'Saldie'
    },
    {
      category: 'Vegeterian',
      imageSrc: 'assets/images/foodCategories/veganic_image.jpg',
      text: 'Veģetārs'
    },
    {
      category: 'Salads',
      imageSrc: 'assets/images/foodCategories/salads_image.jpg',
      text: 'Salāti'
    },
    {
      category: 'Drinks',
      imageSrc: 'assets/images/foodCategories/drinks_image.jpg',
      text: 'Dzērieni'
    },
    {
      category: 'Dormitory',
      imageSrc: 'assets/images/foodCategories/dormitory_image.jpg',
      text: 'Gatavo kojās'
    },
    {
      category: 'Impression',
      imageSrc: 'assets/images/foodCategories/impression_image.jpg',
      text: 'Gribu atstāt lielisku pirmo iespaidu'
    },
    {
      category: 'Other',
      imageSrc: 'assets/images/foodCategories/meat_food_image.jpg',
      text: 'Cits'
    },
  ];

  constructor(private recipeService: RecipeService, private router: Router) { }

  fetchRecipes(category: string): void {
    this.router.navigate(['/recipes', category]);
  }
}
