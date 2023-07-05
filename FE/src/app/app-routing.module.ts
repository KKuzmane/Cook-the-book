import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeCategoryComponent } from './recipe-category/recipe-category.component';

const routes: Routes = [
  { path: '', component: RecipeCategoryComponent },
  // Define other routes if needed
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
