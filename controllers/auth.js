let mysql = require("mysql")
let path = require("path")
let fs = require("fs")
let cheerio = require("cheerio")
let cheerioTableParser = require('cheerio-tableparser')
const { type } = require("os")


let database = mysql.createPool({
    host : "107.180.1.16",
    database : "sprog2022team11",
    user : "sprog2022team11",
    password : "springog2022team11"
})

exports.register = (req, res) => {
    console.log(req.body)
    
   /* let first_name = req.body.FirstName
    let last_name = req.body.last_name
    let password = req.body.password
    let verify_password = req.body.verifypassword
    let email = req.body.Email
    let phone = req.body.PhoneNumber*/

    let {
        FirstName, 
        LastName, 
        password, 
        Verifypassword, 
        Email,
        PhoneNumber,
        Interest1,
        Interest2,
        Interest3
    } = req.body

    database.query('SELECT email FROM Users WHERE email = ?', [Email], (error, results) => {
        if(error) {
            console.log(error)
        }

        if(results.length > 0) {
            console.log("Email already in use")
            
        }
        else if (password !== Verifypassword) {
            console.log("passwords do not match")
            console.log(password)
            console.log(Verifypassword)
            
        }

        database.query('INSERT INTO Users SET ?', {
            
            FirstName: FirstName, 
            LastName: LastName, 
            Email: Email, 
            Password: password, 
            PhoneNumber: PhoneNumber,
            Interest1: Interest1,
            Interest2: Interest2,
            Interest3: Interest3 }, (error, results) => {
                if(error) {
                    console.log(error)
                }
                else {
                    console.log("user registered")
                    let publicDirectory = path.join(__dirname, '..')

                
                    res.sendFile(publicDirectory + '/public/Home.html')
                }
            })
    })

}



exports.login = async (req, res) => {
    try {
        let {username, password} = req.body

        if ( !username || !password ) {
            console.log("no email or password")
        }

        database.query('SELECT * FROM Users WHERE Email = ?', [username], async (error, results) => {

            if( !results || password != results[0].Password) {
                console.log(password)
                console.log(results[0])
                console.log('Email or password incorrect')
                
            }

            else {
                
                let logged_in = results[0]
                console.log(`User ${logged_in.FirstName} ${logged_in.LastName} has logged in`)

                

                let publicDirectory = path.join(__dirname, '..')

                /*let html = fs.readFileSync(publicDirectory + '/public/Home_page.html').toString()
                let $ = cheerio.load(html)

                cheerioTableParser($)

                let table = $("table").parsetable()
                console.log(table)*/

                let matches = []

                database.query('select * from Users', (error, results) => {
                    if (error) {
                        console.log(error)
                    }
                    else {
                        for (let i = 0; i < results.length; i++) {
                            if ((results[i].Interest1 === logged_in.Interest1 || 
                                results[i].Interest2 === logged_in.Interest2 ||
                                results[i].Interest3 === logged_in.Interest3) &&
                                results[i].Email != logged_in.Email) {

                                matches.push(results[i])
                                console.log(matches)
                                let htmldata = `
                                <!DOCTYPE html>
                                <html lang="en">
                                <head>
                                    <meta charset="UTF-8">
                                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <title>Interest Matcher Home Page</title>
                                    <link href="/Home_Page_style.css" rel="Stylesheet">
                                    <script src="jscript.js"></script>
                                </head>
                                <body>

                                    <h1>Welcome, ${logged_in.FirstName} ${logged_in.LastName}</h1>

                                    <div id="Interests" class="Scrollbox">
                                        <h3>You matched interests with...</h3>
                                        <table id="Users">

                                            
                                            <tr>
                                                <th>Name</th>
                                                <th>Similar Interests</th>
                                                <th>Contact Info</th>
                                            </tr>

                                            <tr>
                                                <td>${matches[0].FirstName} ${matches[0].LastName}</td>
                                                <td>${matches[0].Interest1}, ${matches[0].Interest2}, ${matches[0].Interest3}</td>
                                                <td>${matches[0].Email}</td>
                                            </tr>

                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>

                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>

                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>

                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            

                                        </table>

                                    </div>
                                </body>
                                </html>
                        `
                        fs.writeFile(publicDirectory + '/public/new.html', htmldata, (err) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                console.log('res.writefile worked')
                                fs.readFile(publicDirectory + '/public/new.html', 'utf-8', (err, data) => {
                                    if (err) {
                                        console.log(err)
                                    }
                                    else {
                                        res.sendFile(publicDirectory + '/public/new.html')
                                    }
                                })
                            }
                        })
                        
                            }
                        }
                        
                    }
                })
                
                /*let htmldata = `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Interest Matcher Home Page</title>
                            <link href="/Home_Page_style.css" rel="Stylesheet">
                            <script src="jscript.js"></script>
                        </head>
                        <body>

                            <h1>Welcome, ${logged_in.FirstName} ${logged_in.LastName}</h1>

                            <div id="Interests" class="Scrollbox">
                                <h3>You matched interests with...</h3>
                                <table id="Users">

                                    
                                    <tr>
                                        <th>Name</th>
                                        <th>Similar Interests</th>
                                        <th>Contact Info</th>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    

                                </table>

                            </div>
                        </body>
                        </html>
                `
                fs.writeFile(publicDirectory + '/public/new.html', htmldata, (err) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log('res.writefile worked')
                        fs.readFile(publicDirectory + '/public/new.html', 'utf-8', (err, data) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                res.sendFile(publicDirectory + '/public/new.html')
                            }
                        })
                    }
                })*/
                
               /* res.sendFile(publicDirectory + '/public/Home_page.html')*/
                
            }

        })
    } catch (error) {
        console.log(error)
    }
}

/*exports.isLoggedIn = (req, res, next) => {
    req.message = "Inside middleware"
    next()
}*/

