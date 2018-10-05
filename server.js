// Dependencies
var mysql = require("mysql");
require("dotenv").config();
var fs = require("fs");
var express = require("express");
var bodyParser = require('body-parser');
var router = express.Router();
var methodOverride = require('method-override');
var bcrypt = require('bcryptjs');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require("path");

var PORT = 3001;
var app = express();

// set the app up with bodyparser
app.use(methodOverride('_method'));
app.use(session({ secret: 'app', cookie: { maxAge: 1*1000*60*60*24*365 }}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));


/*
  if we don't do this here then we'll get this error in apps that use this api

  Fetch API cannot load No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

  read up on CORs here: https://www.maxcdn.com/one/visual-glossary/cors/
*/
  //allow the api to be accessed by other apps
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
});

// Initializes the connection variable to sync with a MySQL database
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    
    // Your port; if not 3306
    port: 3306,
    
    // Your username
    user: process.env.DB_USER,
    
    // Your password
    password: process.env.DB_PASSWORD,  //placeholder for your own mySQL password that you store in your own .env file
    database: process.env.DB_NAME    //TBD
});


app.get('/', function(req, res){
	res.send('hi');
});



app.listen(PORT, function() {
  console.log('🌎 ==> Now listening on PORT %s! Visit http://localhost:%s in your browser!', PORT, PORT);
});



