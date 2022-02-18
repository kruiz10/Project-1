/*let http = require("http");
let mysql = require("mysql");


let httpServer = http.createServer(processRequest);
httpServer.listen(8080);

function processRequest(request, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    
    let host = "http://" + request.headers["host"];
    let url = new URL(request.url, host);
    console.log(url.href);

    initalizeDB();

    response.write("Login Successful")
}

function initalizeDB() {
    let connectionString = {
        host : "107.180.1.16",
        database : "sprog2022team11",
        user : "sprog2022team11",
        password : "springog2022team11"
    };

    let con = mysql.createConnection(connectionString);
    console.log("Connecting to database...");

    con.connect(
        function (err) {
            if (err) {throw err}
            console.log("Connected");
        }
    )

    query = "SELECT * from Users"

    con.query(query, queryResult);
    con.end();
}

function queryResult(err, result) {
    if (err) {
        throw err
    }
    
    console.log(result)
}*/

let express = require("express")
let mysql = require("mysql")
let path = require("path")
let router= express.Router()

let app = express()

let database = mysql.createConnection({
    host : "107.180.1.16",
    database : "sprog2022team11",
    user : "sprog2022team11",
    password : "springog2022team11"
})

let publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))


app.use(express.urlencoded({extended: false}))
app.use(express.json())


database.connect((error) => {
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

app.use('/auth', require('./routes/auth'))

/*router.post('/create.account.html', (req, res) => {
    console.log(req.body)
    res.send("Form Submitted")
})*/

app.listen(8080, () => {
    console.log("Server started on port 8080")
})




