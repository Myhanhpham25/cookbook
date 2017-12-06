import { Component, OnInit } from '@angular/core';
import { User } from "./../../users/user";
import { DatabaseService } from "./../../database.service";
import { Router } from "@angular/router"
import { Item } from "./../item"

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {


  constructor(private databaseService: DatabaseService, private router : Router) { }

  ngOnInit() {
  }

  deleteItem(item_id){
    this.databaseService.deleteItem(item_id)
    .then(() => {
      this.router.navigate(['dashboard'])
    })
    .catch(err => console.log("error", err))
  }

}
