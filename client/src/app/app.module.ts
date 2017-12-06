import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'; 
import { HttpModule } from '@angular/http';
import { DatabaseService } from './database.service';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { FilterPipe } from './filter.pipe';
import { RecipesComponent } from './recipes/recipes.component';
import { CookbookComponent } from './recipes/cookbook/cookbook.component';
import { DashboardComponent } from './recipes/dashboard/dashboard.component';
import { DetailsComponent } from './recipes/details/details.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    FilterPipe,
    RecipesComponent,
    CookbookComponent,
    DashboardComponent,
    DetailsComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
