const express = require("express");
const app = express();

require("dotenv");

let port = process.env.PORT || 8080;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// routes 
const route = require( "./routes/userRoutes");

app.use("/api", route);

app.use(function (req, res, next){
    let err = new Error ("Not Found");
    err.status = 404;
    next(err);
});

app.listen(port, () => {
    console.log("server is listening on POrt =" + port);
});

