import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { ImgbbService } from '../services/imgbb.service';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';

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
    keywords: [],
    category: []
  };

  recipes: Recipe[] = [];
  showCreateForm: boolean = false;
  showEditForm: boolean = false;
  selectedPhotos: File[] = [];
  ingredientsInput: string = '';

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
    this.newRecipe.ingredients.push({ name: '', quantity: 0, unit: '' });
  }

  removeIngredient(index: number): void {
    this.newRecipe.ingredients.splice(index, 1);
  }

  addKeyword(): void {
    this.newRecipe.keywords.push('');
  }

  removeKeyword(index: number): void {
    this.newRecipe.keywords.splice(index, 1);
  }

  async onSubmit(): Promise<void> {
    if (this.selectedPhotos.length > 0) {
      const apiKey = localStorage.getItem('token');
      if (apiKey) {
        await this.uploadPhotos(apiKey);
      } else {
        console.error('API key (token) not found in localStorage.');
        return;
      }
    }

    this.newRecipe.ingredients = this.parseIngredients(this.ingredientsInput);

    await this.createRecipeWithPhoto();
  }

  private parseIngredients(ingredientsInput: string): Ingredient[] {
    const ingredientsArray: string[] = ingredientsInput.split('\n');
    return ingredientsArray.map(ingredient => {
      const parts = ingredient.split(' ');
      return {
        name: parts[0],
        quantity: parseFloat(parts[1]),
        unit: parts[2]
      };
    });
  }

  async uploadPhotos(apiKey: string): Promise<void> {
    for (const photo of this.selectedPhotos) {
      try {
        const response = await this.imgbbService.uploadPhoto(photo, apiKey).toPromise();
        if (response && typeof response === 'string') {
          const file = this.dataURLtoFile(response, 'uploaded-photo.png');
          this.newRecipe.pictures.push(file);
        } else {
          console.error('Error uploading photo:', response);
        }
      } catch (error) {
        console.error('Error uploading photo:', error);
      }
    }
  }

  dataURLtoFile(dataURL: string, filename: string): File {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  async createRecipeWithPhoto(): Promise<void> {
    console.log('123')
    try {
      const recipe = await this.recipeService.createRecipe(this.newRecipe).toPromise();
      console.log('Recipe created:', recipe);
      this.newRecipe = {
        id: 0,
        name: '',
        instructions: '',
        ingredients: [],
        pictures: [],
        keywords: [],
        category: []
      };
      this.loadRecipes();
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
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
