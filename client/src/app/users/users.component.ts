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

  }

  login(){
    alert("If you're using chrome, please enable ExtensionAllow-Control-Allow-Origin to have full access to the website. To add feature to Chrome, visit : https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en ");

  	this.databaseService.login(this.new_user)
    .then((data) => {
      this.databaseService.setUser(data);
      this.router.navigate(['recipes'])
    })
    .catch(err => console.log("user login error", err))
  }
}
