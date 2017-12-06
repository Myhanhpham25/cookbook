import { Injectable } from '@angular/core';
import { Http } from "@angular/http"
import "rxjs/add/operator/map"
import "rxjs"
import { User } from "./users/user"

@Injectable()
export class DatabaseService {
	showUsername;
	userId; 
	showOneItem;
	showEmail;

	constructor(private http: Http) { }

	getRecipe(recipes){
		return this.http.get(`http://food2fork.com/api/search?key=5617b7ee3cfdc597b6bd39827be71446&q=${recipes}`).map(data => data.json()).toPromise()
	}

	login(new_user : User){
		return this.http.post('/login', new_user).map(data => data.json()).toPromise()
	}

	setUser(data){ //set data so we can use it on other pages 
		this.showUsername = data.username
		this.userId = data.userId
	}

	check(){
		return this.http.get("/check").map(data => data.json()).toPromise()
	}

	saveRecipe(recipe){
		return this.http.post("/favorites", recipe).map(data => data.json()).toPromise()
	}

	user_cookbook(){
		return this.http.get("/user_cookbook").map(data => data.json()).toPromise()
	}

	get_all_users(){
		return this.http.get("/get_users").map(data => data.json()).toPromise()
	}

	destroy(recipe_id){
		return this.http.post("/destroy", {recipe_id:recipe_id}).map(data => data.json()).toPromise()
	}

	post_recipe(form_data){
		return this.http.post("/upload", form_data).toPromise()
	}

	getCustomRecipes(){
		return this.http.get("/allCustomRecipes").map(data => data.json()).toPromise()
	}

	setItem(item){
		this.showOneItem = item
	}

	additem(item){
		return this.http.post("/additem", item).map(data => data.json()).toPromise()
	}

	deleteItem(item_id){
		return this.http.post("/deleteItem", {_id:item_id}).map(data => data.json()).toPromise()
	}

	user_favorite_items(){
		return this.http.get("/allUserItems").map(data => data.json()).toPromise()
	}

	deleteUserItem(item_id){
		return this.http.post("/deleteUserItem" , {_id:item_id}).map(data => data.json()).toPromise()
	}

	new_comment(item){
		return this.http.post("/newComment", {_id: item._id, post: item.comment, poster_name: this.showUsername }).map(data => data.json()).toPromise()
	}

	displayOneItem(item){
		return this.http.post("/displayOneItem", item).map(data => data.json()).toPromise()
	}
}
