const path= require("path")
const logics = require('./../controllers/logics.js')
const items = require('./../controllers/items.js')

module.exports = app => {
	app.post("/login", logics.login)
	app.post("/favorites", logics.favorites)
	app.get("/user_cookbook", logics.user_cookbook)
	app.get("/get_users", logics.get_users)
	app.post("/destroy", logics.destroy)
	app.get('/logout', logics.logout)	
	app.get("/check", logics.check)
	app.post("/additem", logics.addItem)
	app.get("/allUserItems" , logics.allUserItems)
	app.post("/deleteUserItem", logics.deleteUserItem) 

	app.post("/upload", items.upload)
	app.get("/allCustomRecipes", items.getAllCustomRecipes)
	app.post("/deleteItem", items.deleteItem)
	app.post("/newComment", items.newComment)
	app.post("/displayOneItem", items.displayOneItem)


	app.get("*", (req, res) => res.sendFile(path.resolve("./client/dist/index.html")))

}
