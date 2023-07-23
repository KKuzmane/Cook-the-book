import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { environment } from '../../environments/environment';
import { query } from '@angular/animations';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    private apiUrl = `${environment.baseUrl}/api/recipes`;

    constructor(private http: HttpClient) { }

    getRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${this.apiUrl}/GetRecipes`);
    }

    getRecipe(id: number): Observable<Recipe> {
        return this.http.get<Recipe>(`${this.apiUrl}/GetRecipe/${id}`);
    }

    createRecipe(recipe: Recipe): Observable<Recipe> {
        return this.http.post<Recipe>(`${this.apiUrl}/CreateRecipe`, recipe);
    }

    updateRecipe(id: number, updatedRecipe: Recipe): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/UpdateRecipe/${id}`, updatedRecipe);
    }

    deleteRecipe(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/DeleteRecipe/${id}`);
    }

    getCategory(category: string): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${this.apiUrl}/GetCategory?category=${category}`);
    }

    searchRecipe(query: string): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${this.apiUrl}/SearchRecipe?query=${query}`);
    }
}
