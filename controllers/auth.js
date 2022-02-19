let mysql = require("mysql")
let path = require("path")

let database = mysql.createConnection({
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
        verifypassword, 
        Email,
        PhoneNumber
    } = req.body

    database.query('SELECT email FROM Users WHERE email = ?', [Email], (error, results) => {
        if(error) {
            console.log(error)
        }

        if(results.length > 0) {
            console.log("Email already in use")
            
        }
        else if (password !== verifypassword) {
            console.log("passwords do not match")
            
        }

        database.query('INSERT INTO Users SET ?', {
            FirstName: FirstName, 
            LastName: LastName, 
            Email: Email, 
            Password: password, 
            PhoneNumber: PhoneNumber}, (error, results) => {
                if(error) {
                    console.log(error)
                }
                else {
                    console.log("user registered")
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
                console.log('Email or password incorrect')
                console.log(password != results[0].Password)
                console.log(password)
                console.log(results[0].Password)
            }

            else {
                let publicDirectory = path.join(__dirname, '..')
                
                res.sendFile(publicDirectory + '/public/Login.html')
            }

        })
    } catch (error) {
        console.log(error)
    }
}