let mysql = require("mysql")
let path = require("path")
let fs = require("fs")



let logged_in = ''


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
        Interest3,
        Interest4,
        Interest5
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
            Interest3: Interest3,
            Interest4: Interest4,
            Interest5: Interest5 }, (error, results) => {
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
                
                logged_in = results[0]
                console.log(`User ${logged_in.FirstName} ${logged_in.LastName} has logged in`)

                

                let publicDirectory = path.join(__dirname, '..')

                /*let html = fs.readFileSync(publicDirectory + '/public/Home_page.html').toString()
                let $ = cheerio.load(html)

                cheerioTableParser($)

                let table = $("table").parsetable()
                console.log(table)*/

                let matches = [
                    {FirstName: '', LastName: '', Email: '', Interest1: '', Interest2: '', Interest3: '', Interest4: '', Interest5: '', PhoneNumber: ''},
                    {FirstName: '', LastName: '', Email: '', Interest1: '', Interest2: '', Interest3: '', Interest4: '', Interest5: '', PhoneNumber: ''},
                    {FirstName: '', LastName: '', Email: '', Interest1: '', Interest2: '', Interest3: '', Interest4: '', Interest5: '', PhoneNumber: ''},
                    {FirstName: '', LastName: '', Email: '', Interest1: '', Interest2: '', Interest3: '', Interest4: '', Interest5: '', PhoneNumber: ''},
                    {FirstName: '', LastName: '', Email: '', Interest1: '', Interest2: '', Interest3: '', Interest4: '', Interest5: '', PhoneNumber: ''},
                    {FirstName: '', LastName: '', Email: '', Interest1: '', Interest2: '', Interest3: '', Interest4: '', Interest5: '', PhoneNumber: ''},
                    {FirstName: '', LastName: '', Email: '', Interest1: '', Interest2: '', Interest3: '', Interest4: '', Interest5: '', PhoneNumber: ''},
                    {FirstName: '', LastName: '', Email: '', Interest1: '', Interest2: '', Interest3: '', Interest4: '', Interest5: '', PhoneNumber: ''},
                    {FirstName: '', LastName: '', Email: '', Interest1: '', Interest2: '', Interest3: '', Interest4: '', Interest5: '', PhoneNumber: ''},
                    {FirstName: '', LastName: '', Email: '', Interest1: '', Interest2: '', Interest3: '', Interest4: '', Interest5: '', PhoneNumber: ''},
                    {FirstName: '', LastName: '', Email: '', Interest1: '', Interest2: '', Interest3: '', Interest4: '', Interest5: '', PhoneNumber: ''},
                    {FirstName: '', LastName: '', Email: '', Interest1: '', Interest2: '', Interest3: '', Interest4: '', Interest5: '', PhoneNumber: ''},
                    {FirstName: '', LastName: '', Email: '', Interest1: '', Interest2: '', Interest3: '', Interest4: '', Interest5: '', PhoneNumber: ''},
                    {FirstName: '', LastName: '', Email: '', Interest1: '', Interest2: '', Interest3: '', Interest4: '', Interest5: '', PhoneNumber: ''},
                    {FirstName: '', LastName: '', Email: '', Interest1: '', Interest2: '', Interest3: '', Interest4: '', Interest5: '', PhoneNumber: ''},
                    {FirstName: '', LastName: '', Email: '', Interest1: '', Interest2: '', Interest3: '', Interest4: '', Interest5: '', PhoneNumber: ''},
                    {FirstName: '', LastName: '', Email: '', Interest1: '', Interest2: '', Interest3: '', Interest4: '', Interest5: '', PhoneNumber: ''},
                    {FirstName: '', LastName: '', Email: '', Interest1: '', Interest2: '', Interest3: '', Interest4: '', Interest5: '', PhoneNumber: ''},
                    {FirstName: '', LastName: '', Email: '', Interest1: '', Interest2: '', Interest3: '', Interest4: '', Interest5: '', PhoneNumber: ''},
                    {FirstName: '', LastName: '', Email: '', Interest1: '', Interest2: '', Interest3: '', Interest4: '', Interest5: '', PhoneNumber: ''},
                ]

                database.query('select * from Users', (error, results) => {
                    if (error) {
                        console.log(error)
                    }
                    else {
                        for (let i = 0; i < results.length; i++) {
                            if ((results[i].Interest1 === logged_in.Interest1 || 
                                results[i].Interest2 === logged_in.Interest2 ||
                                results[i].Interest3 === logged_in.Interest3 ||
                                results[i].Interest4 === logged_in.Interest4 ||
                                results[i].Interest5 === logged_in.Interest5) &&
                                results[i].Email != logged_in.Email) {

                                matches.unshift(results[i])
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
                                                <td>${matches[0].Interest1}  ${matches[0].Interest2}  ${matches[0].Interest3}  ${matches[0].Interest4}  ${matches[0].Interest5}</td>
                                                <td>
                                                    <div class="dropdown">
                                                    <button class="dropbtn">Connect</button>
                                                    <div class="dropdown-contactInfo">
                                                        <a href="tel:${matches[0].PhoneNumber}">Call Me &#128521;</a>
                                                    <a href="mailto:${matches[0].Email}">&#127359;ush Me an Email</a>
                                                    
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>${matches[1].FirstName} ${matches[1].LastName}</td>
                                                <td>${matches[1].Interest1}  ${matches[1].Interest2}  ${matches[1].Interest3}  ${matches[1].Interest4}  ${matches[1].Interest5}</td>
                                                <td>
                                                    <div class="dropdown">
                                                    <button class="dropbtn">Connect</button>
                                                    <div class="dropdown-contactInfo">
                                                        <a href="tel:${matches[1].PhoneNumber}">Call Me &#128521;</a>
                                                    <a href="mailto:${matches[1].Email}">&#127359;ush Me an Email</a>
                                                    
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>${matches[2].FirstName} ${matches[2].LastName}</td>
                                                <td>${matches[2].Interest1}  ${matches[2].Interest2}  ${matches[2].Interest3}  ${matches[2].Interest4}  ${matches[2].Interest5}</td>
                                                <td>
                                                    <div class="dropdown">
                                                    <button class="dropbtn">Connect</button>
                                                    <div class="dropdown-contactInfo">
                                                        <a href="tel:${matches[2].PhoneNumber}">Call Me &#128521;</a>
                                                    <a href="mailto:${matches[2].Email}">&#127359;ush Me an Email</a>
                                                    
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>${matches[3].FirstName} ${matches[3].LastName}</td>
                                                <td>${matches[3].Interest1}  ${matches[3].Interest2}  ${matches[3].Interest3}  ${matches[3].Interest4}  ${matches[3].Interest5}</td>
                                                <td>
                                                    <div class="dropdown">
                                                    <button class="dropbtn">Connect</button>
                                                    <div class="dropdown-contactInfo">
                                                        <a href="tel:${matches[3].PhoneNumber}">Call Me &#128521;</a>
                                                    <a href="mailto:${matches[3].Email}">&#127359;ush Me an Email</a>
                                                    
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>${matches[4].FirstName} ${matches[4].LastName}</td>
                                                <td>${matches[4].Interest1}  ${matches[4].Interest2}  ${matches[4].Interest3}  ${matches[4].Interest4}  ${matches[4].Interest5}</td>
                                                <td>
                                                    <div class="dropdown">
                                                    <button class="dropbtn">Connect</button>
                                                    <div class="dropdown-contactInfo">
                                                        <a href="tel:${matches[4].PhoneNumber}">Call Me &#128521;</a>
                                                    <a href="mailto:${matches[4].Email}">&#127359;ush Me an Email</a>
                                                    
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>${matches[5].FirstName} ${matches[5].LastName}</td>
                                                <td>${matches[5].Interest1}  ${matches[5].Interest2}  ${matches[5].Interest3}  ${matches[5].Interest4}  ${matches[5].Interest5}</td>
                                                <td>
                                                    <div class="dropdown">
                                                    <button class="dropbtn">Connect</button>
                                                    <div class="dropdown-contactInfo">
                                                        <a href="tel:${matches[5].PhoneNumber}">Call Me &#128521;</a>
                                                    <a href="mailto:${matches[5].Email}">&#127359;ush Me an Email</a>
                                                    
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>${matches[6].FirstName} ${matches[6].LastName}</td>
                                                <td>${matches[6].Interest1}  ${matches[6].Interest2}  ${matches[6].Interest3}  ${matches[6].Interest4}  ${matches[6].Interest5}</td>
                                                <td>
                                                    <div class="dropdown">
                                                    <button class="dropbtn">Connect</button>
                                                    <div class="dropdown-contactInfo">
                                                        <a href="tel:${matches[6].PhoneNumber}">Call Me &#128521;</a>
                                                    <a href="mailto:${matches[6].Email}">&#127359;ush Me an Email</a>
                                                    
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>${matches[7].FirstName} ${matches[7].LastName}</td>
                                                <td>${matches[7].Interest1}  ${matches[7].Interest2}  ${matches[7].Interest3}  ${matches[7].Interest4}  ${matches[7].Interest5}</td>
                                                <td>
                                                    <div class="dropdown">
                                                    <button class="dropbtn">Connect</button>
                                                    <div class="dropdown-contactInfo">
                                                        <a href="tel:${matches[7].PhoneNumber}">Call Me &#128521;</a>
                                                    <a href="mailto:${matches[7].Email}">&#127359;ush Me an Email</a>
                                                    
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>${matches[8].FirstName} ${matches[8].LastName}</td>
                                                <td>${matches[8].Interest1}  ${matches[8].Interest2}  ${matches[8].Interest3}  ${matches[8].Interest4}  ${matches[8].Interest5}</td>
                                                <td>
                                                    <div class="dropdown">
                                                    <button class="dropbtn">Connect</button>
                                                    <div class="dropdown-contactInfo">
                                                        <a href="tel:${matches[8].PhoneNumber}">Call Me &#128521;</a>
                                                    <a href="mailto:${matches[8].Email}">&#127359;ush Me an Email</a>
                                                    
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>${matches[9].FirstName} ${matches[9].LastName}</td>
                                                <td>${matches[9].Interest1}  ${matches[9].Interest2}  ${matches[9].Interest3}  ${matches[9].Interest4}  ${matches[9].Interest5}</td>
                                                <td>
                                                    <div class="dropdown">
                                                    <button class="dropbtn">Connect</button>
                                                    <div class="dropdown-contactInfo">
                                                        <a href="tel:${matches[9].PhoneNumber}">Call Me &#128521;</a>
                                                    <a href="mailto:${matches[9].Email}">&#127359;ush Me an Email</a>
                                                    
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>${matches[10].FirstName} ${matches[10].LastName}</td>
                                                <td>${matches[10].Interest1}  ${matches[10].Interest2}  ${matches[10].Interest3}  ${matches[10].Interest4}  ${matches[10].Interest5}</td>
                                                <td>
                                                    <div class="dropdown">
                                                    <button class="dropbtn">Connect</button>
                                                    <div class="dropdown-contactInfo">
                                                        <a href="tel:${matches[10].PhoneNumber}">Call Me &#128521;</a>
                                                    <a href="mailto:${matches[10].Email}">&#127359;ush Me an Email</a>
                                                    
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>${matches[11].FirstName} ${matches[11].LastName}</td>
                                                <td>${matches[11].Interest1}  ${matches[11].Interest2}  ${matches[11].Interest3}  ${matches[11].Interest4}  ${matches[11].Interest5}</td>
                                                <td>
                                                    <div class="dropdown">
                                                    <button class="dropbtn">Connect</button>
                                                    <div class="dropdown-contactInfo">
                                                        <a href="tel:${matches[11].PhoneNumber}">Call Me &#128521;</a>
                                                    <a href="mailto:${matches[11].Email}">&#127359;ush Me an Email</a>
                                                    
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>${matches[12].FirstName} ${matches[12].LastName}</td>
                                                <td>${matches[12].Interest1}  ${matches[12].Interest2}  ${matches[12].Interest3}  ${matches[12].Interest4}  ${matches[12].Interest5}</td>
                                                <td>
                                                    <div class="dropdown">
                                                    <button class="dropbtn">Connect</button>
                                                    <div class="dropdown-contactInfo">
                                                        <a href="tel:${matches[12].PhoneNumber}">Call Me &#128521;</a>
                                                    <a href="mailto:${matches[12].Email}">&#127359;ush Me an Email</a>
                                                    
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>${matches[13].FirstName} ${matches[13].LastName}</td>
                                                <td>${matches[13].Interest1}  ${matches[13].Interest2}  ${matches[13].Interest3}  ${matches[13].Interest4}  ${matches[13].Interest5}</td>
                                                <td>
                                                    <div class="dropdown">
                                                    <button class="dropbtn">Connect</button>
                                                    <div class="dropdown-contactInfo">
                                                        <a href="tel:${matches[13].PhoneNumber}">Call Me &#128521;</a>
                                                    <a href="mailto:${matches[13].Email}">&#127359;ush Me an Email</a>
                                                    
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>${matches[14].FirstName} ${matches[14].LastName}</td>
                                                <td>${matches[14].Interest1}  ${matches[14].Interest2}  ${matches[14].Interest3}  ${matches[14].Interest4}  ${matches[14].Interest5}</td>
                                                <td>
                                                    <div class="dropdown">
                                                    <button class="dropbtn">Connect</button>
                                                    <div class="dropdown-contactInfo">
                                                        <a href="tel:${matches[14].PhoneNumber}">Call Me &#128521;</a>
                                                    <a href="mailto:${matches[14].Email}">&#127359;ush Me an Email</a>
                                                    
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>${matches[15].FirstName} ${matches[15].LastName}</td>
                                                <td>${matches[15].Interest1}  ${matches[15].Interest2}  ${matches[15].Interest3}  ${matches[15].Interest4}  ${matches[15].Interest5}</td>
                                                <td>
                                                    <div class="dropdown">
                                                    <button class="dropbtn">Connect</button>
                                                    <div class="dropdown-contactInfo">
                                                        <a href="tel:${matches[15].PhoneNumber}">Call Me &#128521;</a>
                                                    <a href="mailto:${matches[15].Email}">&#127359;ush Me an Email</a>
                                                    
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>${matches[16].FirstName} ${matches[16].LastName}</td>
                                                <td>${matches[16].Interest1}  ${matches[16].Interest2}  ${matches[16].Interest3}  ${matches[16].Interest4}  ${matches[16].Interest5}</td>
                                                <td>
                                                    <div class="dropdown">
                                                    <button class="dropbtn">Connect</button>
                                                    <div class="dropdown-contactInfo">
                                                        <a href="tel:${matches[16].PhoneNumber}">Call Me &#128521;</a>
                                                    <a href="mailto:${matches[16].Email}">&#127359;ush Me an Email</a>
                                                    
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>${matches[17].FirstName} ${matches[17].LastName}</td>
                                                <td>${matches[17].Interest1}  ${matches[17].Interest2}  ${matches[17].Interest3}  ${matches[17].Interest4}  ${matches[17].Interest5}</td>
                                                <td>
                                                    <div class="dropdown">
                                                    <button class="dropbtn">Connect</button>
                                                    <div class="dropdown-contactInfo">
                                                        <a href="tel:${matches[17].PhoneNumber}">Call Me &#128521;</a>
                                                    <a href="mailto:${matches[17].Email}">&#127359;ush Me an Email</a>
                                                    
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>${matches[18].FirstName} ${matches[18].LastName}</td>
                                                <td>${matches[18].Interest1}  ${matches[18].Interest2}  ${matches[18].Interest3}  ${matches[18].Interest4}  ${matches[18].Interest5}</td>
                                                <td>
                                                    <div class="dropdown">
                                                    <button class="dropbtn">Connect</button>
                                                    <div class="dropdown-contactInfo">
                                                        <a href="tel:${matches[18].PhoneNumber}">Call Me &#128521;</a>
                                                    <a href="mailto:${matches[18].Email}">&#127359;ush Me an Email</a>
                                                    
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>${matches[19].FirstName} ${matches[19].LastName}</td>
                                                <td>${matches[19].Interest1}  ${matches[19].Interest2}  ${matches[19].Interest3}  ${matches[19].Interest4}  ${matches[19].Interest5}</td>
                                                <td>
                                                    <div class="dropdown">
                                                    <button class="dropbtn">Connect</button>
                                                    <div class="dropdown-contactInfo">
                                                        <a href="tel:${matches[19].PhoneNumber}">Call Me &#128521;</a>
                                                    <a href="mailto:${matches[19].Email}">&#127359;ush Me an Email</a>
                                                    
                                                    </div>
                                                </td>
                                            </tr>
                                            

                                        </table>
                                    </div>
                                    <form class="edit" action="/auth/edit" method="POST">
                                        <button id="edit_button" type="submit">Edit Interests</button>
                                    </form>
                                    <form class="edit" action="/auth/logout" method="POST">
                                        <button id="logout_button" type="submit">Logout</button>
                                    </form>
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
                
            }

        })
    } catch (error) {
        console.log(error)
    }
}

exports.edit = (req, res) => {
    
    let htmldata = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Interest Matcher</title>
            <link href="/CreateAccount.stylesheet.css" rel="stylesheet">
            <script src="Home.script.js"></script>
        </head>

        <body>
            <div id="wrapper">
                <h1>Update Account</h1>

                <div id="create_account" align="center">
                    <form id="credentials_form" action="/auth/update" method="POST">
                        
                        <h2>Update Interests for ${logged_in.FirstName} ${logged_in.LastName}</h2>
                        
                            <select name="Interest1" >
                                <option value="Choose">Select Lifestyle Interests</option>
                                <option value="Active">Active</option>
                                <option value="Couch Potato">Couch Potato</option>
                                <option value="Career Oriented">Career Oriented</option>
                                <option value="">None</option>
                            </select><br><br>

                            <select name="Interest2" >
                                <option value="Choose">Select Technology Interests</option>
                                <option value="VR">VR</option>
                                <option value="Apple">Apple</option>
                                <option value="Microsoft">Microsoft</option>
                                <option value="">None</option>
                            </select><br><br>

                            <select name="Interest3" >
                                <option value="Choose">Select Sports Interests</option>
                                <option value="Basketball">Basketball</option>
                                <option value="Football">Football</option>
                                <option value="Soccer">Soccer</option>
                                <option value="">None</option>
                            </select><br><br>

                            <select name="Interest4" >
                                <option value="Choose">Select Music Interests</option>
                                <option value="Hip Hop">Hip Hop</option>
                                <option value="Rock">Rock</option>
                                <option value="EDM">EDM</option>
                                <option value="">None</option>
                            </select><br><br>

                            <select name="Interest5" >
                                <option value="Choose">Select Entertainment Interests</option>
                                <option value="Television">Television</option>
                                <option value="Social Media">Social Media</option>
                                <option value="Video Games">Video Games</option>
                                <option value="">None</option>
                            </select> <br><br>
                        
                        <button type="submit" class="home_button" id="CreateAccount_button">Update Account</button> </button><br><br>
                        
                    </form>
                </div>
                

                
            </div>
        </body>
    </html>
    `
    let publicDirectory = path.join(__dirname, '..')

    fs.writeFile(publicDirectory + '/public/edit.html', htmldata, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log('res.writefile worked')
            fs.readFile(publicDirectory + '/public/edit.html', 'utf-8', (err, data) => {
                if (err) {
                    console.log(err)
                }
                else {
                    res.sendFile(publicDirectory + '/public/edit.html')
                }
            })
        }
    })
}

exports.update = (req, res) => {
    console.log('update worked')
    let {
        Interest1,
        Interest2,
        Interest3,
        Interest4,
        Interest5
    } = req.body   
    
    let Email = logged_in.Email
    
    database.query(`UPDATE Users SET ? WHERE Email = '${Email}'`, {
            
        Interest1: Interest1,
        Interest2: Interest2,
        Interest3: Interest3,
        Interest4: Interest4,
        Interest5: Interest5 }, (error, results) => {
            if(error) {
                console.log(error)
            }
            else {
                console.log("user updated")
                let publicDirectory = path.join(__dirname, '..')

            
                res.sendFile(publicDirectory + '/public/Home.html')
            }
        })

}

exports.logout = (req, res) => {
    
    logged_in = ''

    let publicDirectory = path.join(__dirname, '..')
    res.sendFile(publicDirectory + '/public/Home.html')
}