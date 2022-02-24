let express = require("express")

let router = express.Router()
let authController = require('../controllers/auth')

/*router.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/Home.html")
})

router.get('/create.account.html', (req, res) => {
    res.sendFile(__dirname + "/public/create.account.html")
})

router.get('/Home.html', (req, res) => {
    res.sendFile(__dirname + "/public/Home.html")
})*/

router.get('/public', authController.isLoggedIn, (req, res) => {
    res.sendFile(__dirname + '/public/Home_page.html')
})

module.exports = router