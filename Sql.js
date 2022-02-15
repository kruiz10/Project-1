let http = require("http");
let mysql = require("mysql");

let httpServer = http.createServer(processRequest);
httpServer.listen(8080);

function processRequest(request, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    res = response;
    let host = "http://" + request.headers["host"];
    let url = new URL(request.url, host);
    console.log(url.href);

    initalizeDB();
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
}