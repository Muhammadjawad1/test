conn = require("../config")

function checkUser (email){
    return new Promise((res, rej) =>{
        let query = `SELECT * FROM users WHERE email = ?`;
        conn.query( query, [email], (err, rows) =>{
            if(err){
                rej(err);
            }
            res(rows)
        });
    });
}
function postUser (name, password, email){
    return new Promise((res, rej) =>{
        let query = 'INSERT INTO users (`name`, `password`, `email` ) VALUES (?,?,?)';
        conn.query( query, [name, password,email], (err, rows) =>{
            if(err){
                rej(err);
            }
            res(rows)
        });
    });
}
async function register(req, res) {
    try {
        let name =  req.body.name;
        let password = req.body.password; 
        let email =  req.body.email;
        let nameRegex = new RegExp("\\d+");
        if(name == null && name == undefined && nameRegex.test(name)){
            res.jsonp({
                message: "name is undefined or name contains numbers"
            });
        }
        let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$")
        if(password == null && password == undefined && passwordRegex.test(password) ){
            res.jsonp({
                message: "Password cannot be less than 6 characters"
            });
        }
        let emailRegex = new RegExp("/\S+@\S+\.\S+/")
        if(email == null && email == undefined  && emailRegex.test(email)){
            res.jsonp({
                message: "Email cannot be undefined"
            });
        }
        //check existing users
        const User = await checkUser(email);
        if(User.length > 0) {
            res.jsonp({
                message:"User already exists"
            });
        }

        postUser(name, password, email).then((data)=>{
            res.jsonp({
                message: "User added successsfully"
            });
        });

    } catch (error) {
        res.jsonp({
            message: error.message
        });
    }
}

function checkUserLogin (email , password){
    return new Promise((res, rej) =>{
        let query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
        conn.query( query, (err, rows) =>{
            if(err){
                rej(err);
            }
            res(rows)
        });
    });
}

async function login(req, res) {
    try {
        let password = req.body.password; 
        let email =  req.body.email;
        let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$")
        if(password == null && password == undefined && passwordRegex.test(password) ){
            res.jsonp({
                message: "Password cannot be less than 6 characters"
            });
        }
        let emailRegex = new RegExp("/\S+@\S+\.\S+/")
        if(email == null && email == undefined  && emailRegex.test(email)){
            res.jsonp({
                message: "Email cannot be undefined"
            });
        }

        checkUserLogin(email, password).then((data)=>{
            res.jsonp({
                name: data[0].name,
            });
        });

    } catch (error) {
        res.jsonp({
            message: error.message
        });
    }
}



module.exports= { register, login}