import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchRecipes();
  }

  fetchRecipes(): void {
    const category = this.route.snapshot.paramMap.get('category');
    if (category) {
      this.recipeService.getCategory(category)
        .subscribe(
          (recipes: Recipe[]) => {
            this.recipes = recipes;
          },
          (error: any) => {
            console.error(error);
          }
        );
    }
  }
}
