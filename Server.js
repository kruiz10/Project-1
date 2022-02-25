let express = require("express")
let mysql = require("mysql")
let path = require("path")
let router = express.Router()
let exphbs = require('express-handlebars')
let bodyParser = require('body-parser')



let app = express()

let database = mysql.createPool({
    host : "107.180.1.16",
    database : "sprog2022team11",
    user : "sprog2022team11",
    password : "springog2022team11"
})

let publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))


app.use(express.urlencoded({extended: false}))
app.use(express.json())


database.getConnection((error) => {
    if (error) {
        console.log(error)
    }
    else {
        console.log("mySQL connected")
    }
})

// app.use('/', require('./routes/pages'))

app.get("/", (req, res) => {
     //res.render('/Home')
     res.sendFile(__dirname + "/public/Home.html")
})

app.get("/create.account.html", (req, res) => {
    res.sendFile(__dirname + "/public/create.account.html")
})



/*app.use('/', require('./routes/pages'))*/

app.use('/auth', require('./routes/auth'))


/*router.post('/create.account.html', (req, res) => {
    console.log(req.body)
    res.send("Form Submitted")
})*/

app.listen(8080, () => {
    console.log("Server started on port 8080")
})

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())


