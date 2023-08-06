import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { ImgbbService } from '../services/imgbb.service';
import { Recipe } from '../models/recipe.model';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  newRecipe: Recipe = {
    id: 0,
    name: '',
    instructions: '',
    ingredients: [],
    pictures: [],
    keywords: [] as string[],
    categories: [] as Category[]
  };

  recipes: Recipe[] = [];
  showCreateForm: boolean = false;
  showEditForm: boolean = false;
  selectedPhotos: File[] = [];

  constructor(private recipeService: RecipeService, private imgbbService: ImgbbService) { }

  ngOnInit(): void {
  }

  onPhotoSelected(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      this.selectedPhotos = Array.from(files);
    }
  }

  addIngredient(): void {
    this.newRecipe.ingredients.push({ name: '', quantity: 0, unit: 0 });
  }

  removeIngredient(index: number): void {
    this.newRecipe.ingredients.splice(index, 1);
  }

  addKeyword(): void {
    this.newRecipe?.keywords?.push('');
  }

  removeKeyword(index: number): void {
    this.newRecipe?.keywords?.splice(index, 1);
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  onKeywordChange(index: number, value: string): void {
    if (this.newRecipe.keywords) {
      this.newRecipe.keywords[index] = value;
    }
  }

  addCategory(): void {
    this.newRecipe.categories.push({ name: '' });
  }

  removeCategory(index: number): void {
    this.newRecipe.categories.splice(index, 1);
  }

  onSubmit(): void {
    this.uploadPhotos();
    this.createRecipe();
    this.selectedPhotos = [];
  }

  uploadPhotos(): void {
    const apiKey = localStorage.getItem('token');
    if (!apiKey) {
      console.error('API key (token) not found in localStorage.');
      return;
    }

    for (const photo of this.selectedPhotos) {
      this.imgbbService.uploadPhoto(photo, apiKey).subscribe(
        imageUrl => {
          console.log('Uploaded photo link:', imageUrl);
          this.newRecipe.pictures.push(imageUrl);
        },
        error => {
          console.error('Error uploading photo:', error);
        }
      );
    }
  }

  reloadRecipeObject(): void {
    this.newRecipe = {
      id: 0,
      name: '',
      instructions: '',
      ingredients: [],
      pictures: [],
      keywords: [],
      categories: []
    };
  }

  createRecipe(): void {
    try {
      this.recipeService.createRecipe(this.newRecipe).subscribe(
        recipe => {
          console.log('Recipe created:', recipe);
          this.reloadRecipeObject();
          this.loadRecipes();
        },
        error => {
          console.error('Error creating recipe:', error);
        }
      );
    } catch (error) {
      console.error('Error creating recipe:', error);
    }

    this.newRecipe.pictures = [];
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
}
