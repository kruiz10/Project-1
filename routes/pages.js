let express = require("express")

let router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/Home.html")
})

router.get('/create.account.html', (req, res) => {
    res.sendFile(__dirname + "/public/create.account.html")
})

router.get('/Home.html', (req, res) => {
    res.sendFile(__dirname + "/public/Home.html")
})

module.exports = router