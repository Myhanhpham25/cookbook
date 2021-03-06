const express = require("express")
const path = require("path")

const app = express()
const bodyParser = require("body-parser")
const session = require("express-session")
const fileUpload = require("express-fileupload")

const PORT = 8000

app.use(express.static(path.join(__dirname, "./static")))
app.use(express.static(path.join(__dirname, "./client/dist")))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}))

app.use(session({secret: "really really secret", resave: false, saveUninitialized: true }))

require("./server/config/mongoose.js")

require("./server/config/routes.js")(app)

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})