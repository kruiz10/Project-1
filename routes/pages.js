let express = require("express")

let router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/Home.html")
})