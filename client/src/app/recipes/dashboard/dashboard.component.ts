import { Component, OnInit } from '@angular/core';
import { User } from "./../../users/user";
import { DatabaseService } from "./../../database.service";
import { Router } from "@angular/router";
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  comment; 
  users : Array<User>;
  item; 
  message;
  user_recipes : Array<any>
  showOneItem;

  constructor(private databaseService: DatabaseService, private router : Router) { }

  showCommentbox(event){
    console.dir()
    $(event.target.parentNode.nextElementSibling).slideToggle()
  }

  ngOnInit() {
    this.item = {food_title: "" , image_url:"", ingredients: "", instructions:""}
    this.comment = " "
    
    this.databaseService.check()
    .then(user => console.log(user))
    .catch(() => this.router.navigate(["/login"]))

    this.databaseService.get_all_users()
    .then(users => this.users = users)
    .catch(err => console.log("get all the users error", err))
  }

  showOneRecipe(item){
    this.databaseService.displayOneItem(item)
    .then((data)=> {
      this.databaseService.setItem(data)
      this.router.navigate(['details'])
    })
    .catch(err => console.log("showoneItem errors", err))
  }
  
  
  saveRecipe(recipe){
    this.databaseService.saveRecipe(recipe)
    .then((data) => {
      if(data.message){
        this.message = data.message
        this.ngOnInit()
      }else{
        this.message = "Added to your Cookbook"
        this.ngOnInit()
      }
      setTimeout(()=> this.message=" ", 2000)
    })
    .catch(err => console.log("saveRecipe errors", err))
  }

  new_comment(item){
    this.databaseService.new_comment(item)
    .then(() =>{
      this.comment = " "
      this.ngOnInit() 
    } )
    .catch(err => console.log("errors", err))
  }

}

