import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeCategoryComponent } from './recipe-category/recipe-category.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/categories', pathMatch: 'full' },
  { path: 'categories', component: RecipeCategoryComponent },
  { path: 'recipes/:category', component: RecipeListComponent },
  { path: 'admin', component: AdminComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
