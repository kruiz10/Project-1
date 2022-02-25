let express = require('express')
let authController = require('../controllers/auth')
let router = express.Router()


router.post('/register', authController.register)

router.post('/login', authController.login)

router.post('/edit', authController.edit)

router.post('/update', authController.update)



module.exports = router