const mongoose = require("mongoose")
const User = mongoose.model("User")
const Item = mongoose.model("Item")
const path = require("path")

module.exports = {

	get_users: (req, res) => {
		User.find({})
		.then(users => res.json(users))
		.catch(err => {
			console.log("user find all errors", err)
			res.status(500).json(err)
		})
	},

	login: (req, res) => {
		User.findOne({email: req.body.email})
		.then(user => {
			if(user){
				req.session.user = user
				username = req.session.user.name
				userId = req.session.user._id
				res.json({username: username, userId : userId})

			} else {
				let new_user = new User(req.body)
				new_user.save()
				.then(() => {
					req.session.user = new_user
					username = req.session.user.name 
					res.json({username: username})
				})
				.catch(err => {
					console.log("User save error", err)
					res.status(500).json(err)
				})
			}
		})	
	},

//user logging out and destroying session
logout: (req, res) => {
	req.session.destroy()
	res. redirect('/login')
},

//check to see if user is in session before loading to the next page.
check: (req, res) => {
	if(req.session.user){
		res.json(req.session.user)
	} else {
		res.status(401).json(false)
	}
},

//add api recipes to user's cookbook
favorites: (req, res) => {
	id = req.session.user._id
	let favorite_recipe = {image_url: req.body.image_url, recipe_id: req.body.recipe_id, title : req.body.title}
	User.findOne({_id:id})	
	.then(user => {
		if(user){
			let flag = true
			for(var x = 0; x < user.favorites.length; x++){
				if(user.favorites[x].recipe_id == req.body.recipe_id){
					flag = false 
				}
			}
			if(flag == true){
				user.favorites.push(favorite_recipe)
				user.save()
				let user_favorite = user.favorites
				res.json({favorites: user_favorite})
			}else{
				res.json({message:"Recipe already been added to your Recipe Book!"})
			}
		}
	})
	.catch(err => {
		console.log("User save error", err)
		res.status(500).json(err)
	})
},

//find all the users saved recipes from their array to show on the cookbook component. 
user_cookbook: (req, res) => {
	id = req.session.user._id
	User.findOne({ _id:id})
	.then(user => {
		if(user){
			let user_favorite = user.favorites
			res.json(user_favorite)
		}
	})
	.catch(err => {
		console.log("get favorites logic js errors", err)
		res.status(500).json(err)
	})
},

//delete recipes from user's cookbook
destroy: (req, res) => {
	recipe_id = req.body.recipe_id
	id = req.session.user._id
	User.update({ _id:id}, {$pull: {favorites : {recipe_id :recipe_id }}})
	.then(user => {
		if(user){
			res.json(true)
		}
	})
	.catch(err => {
		console.log("destory recipe method errors", err)
		res.status(500).json(err)
	})
},

//adding item to user's cookbook 
addItem: (req, res) => {
	id = req.session.user._id 
	let item_recipe = req.body 
	User.findOne({_id:id})	
	.then(user => {
		if(user){
			let flag = true
			for(var i = 0; i < user.favoriteItems.length; i++){
				if(user.favoriteItems[i]._id == req.body._id){
					flag = false 
				}
			}
			if (flag == true){
				user.favoriteItems.push(item_recipe)
				user.save()
				let user_item = user.favoriteItems
				console.log("user item after saving " + user_item)
				res.json({item: user_item})
			}else{
				res.json({message:"Recipe already been added to your Recipe Book!"})
			}
		}
	})
	.catch(err => {
		console.log("User save error", err)
		res.status(500).json(err)
	})
},

//GET ALL USERS FAVORITE ITEMS 
allUserItems: (req, res) => {
	id = req.session.user._id
	User.findOne({ _id:id})
	.then(user => {
		if(user){
			let user_items = user.favoriteItems
			res.json(user_items)
		}
	})
	.catch(err => {
		console.log("get favorites logic js errors", err)
		res.status(500).json(err)
	})
},

//DELETE ITEM FROM USER'S FAVORITE ITEM ARRAY LIST
deleteUserItem: (req, res) => {
	item_id = req.body._id
	id = req.session.user._id
	User.update({ _id:id}, {$pull: {favoriteItems : {_id :item_id }}})
	.then(user => {
		if(user){
			res.json(true)
		}
	})
	.catch(err => {
		console.log("erase added recipe method errors", err)
		res.status(500).json(err)
	})
}

}

