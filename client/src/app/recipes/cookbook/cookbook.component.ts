import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from "./../../users/user";
import { DatabaseService } from "./../../database.service";
import { Router } from "@angular/router";
declare var jquery:any;
declare var $ :any;
import { Item } from "./../../recipes/item"

@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.css']
})
export class CookbookComponent implements OnInit {

  recipes: Array<any>;
  user : Array<User>;
  favorites : Array<any>
  items: Array<any>
  message;
  user_recipes : Array<any>
  new_item = new Item 

  @ViewChild("file") file_input
  @ViewChild("form") my_form

  constructor(private databaseService: DatabaseService, private router : Router) { }

  toggleForm(){
    $("#form1").slideToggle()
  }

  showRecipe(event){
    console.dir()
    $(event.target.parentNode.nextElementSibling).slideToggle()
  }

  ngOnInit() {
    
    this.databaseService.check()
    .then(user => console.log(user))
    .catch(() => this.router.navigate(["/login"]))

    this.databaseService.user_cookbook()
    .then(data => this.favorites = data)
    .catch(err => console.log("Get all favorite errors, componments ts", err))

    this.databaseService.user_favorite_items()
    .then(user_items_data => this.items = user_items_data)
    .catch(err => console.log("Get all user_recipes errors, componments ts", err))

  }

  create_item(){
    let form_data = new FormData(this.my_form.nativeElement)
    this.databaseService.post_recipe(form_data)
    .then(() => {
      this.new_item = new Item
      this.file_input.nativeElement.value = ""
      this.router.navigate(['recipes'])
    })
  }

  destroy(recipe_id){
    this.databaseService.destroy(recipe_id)
    .then(() => {
      this.ngOnInit()
    })
    .catch(err => console.log("Error", err))
  }

  deleteUserItem(item_id){
    this.databaseService.deleteUserItem(item_id)
    .then(() => {
      this.ngOnInit()
    })
    .catch(err => console.log("Error", err))
  }
  
  showOneRecipe(item){
    this.databaseService.setItem(item)
    this.router.navigate(['details'])
  }
  
}
