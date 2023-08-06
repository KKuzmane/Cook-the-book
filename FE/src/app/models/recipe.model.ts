import { Ingredient } from './ingredient.model';
import { Category } from './category.model';

export interface Recipe {
    id: number;
    name: string;
    instructions: string;
    ingredients: Ingredient[];
    pictures: string[];
    keywords?: string[];
    categories: Category[];
}
