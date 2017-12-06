const mongoose = require("mongoose")

const ItemSchema = mongoose.Schema({

	name: String, 
	picture: String,
	ingredients: String,
	instructions: String,
	creator: String,
	creator_id: String,
	comment: [{
		post: String,
		poster_name: String
		
	}]


}, {timestamps: true})


mongoose.model("Item", ItemSchema)