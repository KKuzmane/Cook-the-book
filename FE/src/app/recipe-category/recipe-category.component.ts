import { Component, Input } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-category',
  templateUrl: './recipe-category.component.html',
  styleUrls: ['./recipe-category.component.css']
})
export class RecipeCategoryComponent {
  @Input() category!: string;
  @Input() imageSrc?: string;
  @Input() text?: string;

  isHovered = false;

  constructor(private recipeService: RecipeService, private router: Router) { }

  fetchRecipes(): void {
    this.recipeService.getCategory(this.category)
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
