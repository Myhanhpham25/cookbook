const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({

	name: String, 
	email: String,
	password: String,
	favorites: [],
	favoriteItems: []
	
}, {timestamps: true})


mongoose.model("User", UserSchema)