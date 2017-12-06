const mongoose = require("mongoose")
const User = mongoose.model("User")
const Item = mongoose.model("Item")
const path = require("path")

module.exports = {

//uploading personal recipes files plus local image
upload: (req, res) => {
	let new_item = new Item(req.body)

	if(req.files.picture){
		let file = req.files.picture
		let file_type = file.mimetype.match(/image\/(\w+)/)
		let new_file_name = ""

		if(file_type){
			let new_file_name = `${new Date().getTime()}.${file_type[1]}`
			file.mv(path.resolve(__dirname, "../../static/imgs/", new_file_name), err => {
				if(err){ console.log("file move error", err) }
			})
			new_item.picture = new_file_name
		}
	}
	
	new_item.save()
	.then(() => {
		res.redirect("/")
	})
	.catch(err => {
		console.log("my_item save error", err)
		res.redirect("/")
	})
},

getAllCustomRecipes: (req, res) => {
	Item.find({})
	.then(items => res.json(items))
	.catch(err => {
		console.log("items find all errors", err)
		res.status(500).json(err)
	})
},

deleteItem: (req, res) => {
	item_id = req.body._id
	Item.remove({_id : item_id})
	.then(() => res.json(true))
	.catch(err => {
		console.log("delete item method errors" , err)
		res.status(500).json(err)
	})
},

//adding a new comment to the item comment array 
newComment: (req, res) => {
	add_comment = {post: req.body.post, poster_name: req.body.poster_name }
	item_id = req.body._id
	Item.findOne({_id : req.body._id})
	.then(item => {
		if(item){
			item.comment.push(add_comment)
			item.save()
			let item_comments = item.comment
			res.json({ comments: item_comments})
		}else{
			res.json({message: "Comment not posted, posting error"})
		}
	})
	.catch(err => {
		console.log("item comment errors", err)
		res.status(500).json(err)
	})

},

//show one item 
displayOneItem: (req, res) => {
	Item.findOne({_id : req.body._id})
	.then(item => res.json(item))
	.catch(err => {
		console.log("dispaly one item find all errors", err)
		res.status(500).json(err)
	})	
}

}
