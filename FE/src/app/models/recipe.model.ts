import { Category } from "./category.model";
import { Ingredient } from "./ingredient.model";

export interface Recipe {
    id: number;
    name: string;
    ingredients: Ingredient[];
    instructions: string;
    pictures: File[];
    keywords: string[];
    category: Category[];
}
