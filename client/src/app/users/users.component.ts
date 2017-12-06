import { Component, OnInit } from '@angular/core';
import { User } from "./user";
import { DatabaseService } from "./../database.service";
import { Router } from "@angular/router"

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
	new_user : User

  constructor(private databaseService: DatabaseService, private router : Router) { }

  ngOnInit() {
  	this.new_user = new User
  	this.new_user.name = "hanh"
    this.new_user.email = "myhanhiie@gmail.com"
    this.new_user.password = "password"
  }

  login(){
  	this.databaseService.login(this.new_user)
    .then((data) => {
      this.databaseService.setUser(data);
      this.router.navigate(['recipes'])
    })
    .catch(err => console.log("user login error", err))
  }
}
