import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { RecipesComponent } from './recipes/recipes.component';
import { CookbookComponent } from './recipes/cookbook/cookbook.component';
import { DashboardComponent } from './recipes/dashboard/dashboard.component';
import { DetailsComponent } from './recipes/details/details.component';

const routes: Routes = [

{path: 'login', component: UsersComponent},
{path: 'recipes', component: RecipesComponent },
{path: 'cookbook', component: CookbookComponent },
{path: 'dashboard', component: DashboardComponent },
{path: 'details', component: DetailsComponent },
{path: '**', redirectTo: "/login" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
