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
var morgan = require('morgan');
var path = require("path");
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

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
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
});

// use morgan to log requests to the console
app.use(morgan('dev'));

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

app.post('/login', function(req,res){
  let username = req.body.username;
  let password = req.body.password;
  console.log(username + " " + password);
  connection.query('SELECT * FROM users WHERE username = ?', [username],function (error, results, fields) {
    if (error) throw error;
  
    //  res.json(results);
    console.log(results);
    if (results.length == 0){
      // res.redirect('/login');
      console.log("no such user");
      res.json({success: false});
    }
    else {
      bcrypt.compare(password, results[0].password, function(err, result) {
      if (result == true){
        // const payload = {
        //   user: username 
        // };
          // var token = jwt.sign(payload, app.get('superSecret'), {
              // expiresInMinutes: 1440 // expires in 24 hours }
          // );
          req.session.user_id = results[0].id;
          req.session.email = results[0].email;
          req.session.username = results[0].username;
          req.session.firstName = results[0].first_name;
          req.session.lastName = results[0].last_name;
            // return the information including token as JSON
          res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token
          });
             
    
        
        // console.log(req.session.user_id + req.session.email + req.session.username + req.session.firstName + req.session.lastName);
        // console.log("got session and sending it back");
        // res.json({success: true});
        // // res.redirect('decks');
        // res.render('pages/decks', {data: [req.session]});
      }
      else{
        console.log("did not get session");
        res.json({success: false});;
      }
      });
    }
  });
});

app.post("/signup", function(req,res){
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var query = connection.query("SELECT * FROM users WHERE username = ? OR email = ?", [username, email],function (error, results, fields) {
      if(error) throw error;
      if(results.length == 0)
      {
        console.log("no duplicate username or email" + password.length);  
        bcrypt.genSalt(10, function(err, salt) {
          // res.send(salt);
          bcrypt.hash(password, salt, function(err, p_hash) { 
            connection.query('INSERT INTO users (username, password, first_name, last_name, email) VALUES (?,?,?,?,?)', [username, p_hash, firstName, lastName, email],function (error, results, fields) {
              if (error) throw error;
              console.log(results);
              connection.query('SELECT id FROM users WHERE username = ?', [username],function (error, results, fields) {
                if(error) throw error;
                console.log(results[0].id);
                res.json({success:true});
              });
            })
          })
        })
      }
      else{
        console.log("username/email taken");
        
      }
    });
  });

app.get('/logout', function(req, res){
  req.session.destroy(function(err){
    res.json({success: true});
  })
});

app.get('/usersapi', function (req, res){
   // check header or url parameters or post parameters for token
   var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;
   console.log(req.headers.authorization);
  console.log(token);
   // decode token
   if (token) {
 
     // verifies secret and checks exp
     jwt.verify(token, 'shhhhh', function(err, decoded) {      

    connection.query('SELECT username, first_name, last_name FROM users',function (error, results, fields) {
    if (error) throw error;
    console.log(results);
  res.json(results);
  })
})
}
  else{
    console.log("unsuccessful because no token");
  }
});

app.listen(PORT, function() {
  console.log('🌎 ==> Now listening on PORT %s! Visit http://localhost:%s in your browser!', PORT, PORT);
});



