import { Component, OnInit } from '@angular/core';
import { User } from "./../users/user";
import { DatabaseService } from "./../database.service";
import { Router } from "@angular/router"
import { Item } from "./item"

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
	dishes;
	recipes: Array<any>
	user : Array<User>
	message;
	items : Array<Item>
	item;

  constructor(private databaseService: DatabaseService, private router : Router) { }

  ngOnInit() {
    this.dishes = " "; 

    this.databaseService.getCustomRecipes()
    .then(data => this.items = data)
    .catch(err => console.log("Get all items errors, componments ts", err))

    this.databaseService.check()
    .then(user => console.log(user))
    .catch(() => this.router.navigate(["/login"]))
  }

  getRecipes(){
    this.databaseService.getRecipe(this.dishes)
    .then(recipes => {
      this.recipes = recipes.recipes;
      this.dishes= " ";
    })
    .catch(err => console.log("getRecipes errors", err))
  }

  saveRecipe(recipe){
    this.databaseService.saveRecipe(recipe)
    .then((data) => {
      if(data.message){
        this.message = data.message
      }else{
        this.message = "Added to your Cookbook"
      }
      setTimeout(()=> this.message=" ", 2000)
    })
    .catch(err => console.log("saveRecipe errors", err))
  }

  showOneRecipe(item){
    this.databaseService.displayOneItem(item)
    .then((data)=> {
      this.databaseService.setItem(data)
      this.router.navigate(['details'])
    })
    .catch(err => console.log("showoneItem errors", err))
  }

  Additem(item){
    this.databaseService.additem(item)
    .then((data) => {
      if(data.message){
        this.message = data.message
      }else{
        this.message = "Added to your Recipe Book"
        this.ngOnInit()
      }
      setTimeout(()=> this.message=" ", 2000)
    })
    .catch(err => console.log("save user item.recipe error", err))
  }

}
