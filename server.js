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

// var server = require('http'),
var url = require('url');
    // path = require('path'),
    // fs = require('fs');
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
          var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
            // return the information including token as JSON
          res.status(200).json({
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
        res.status(403).json({success: false});;
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

// ALL AUTHENTICATED ROUTE GOES BELOW THIS
// app.use((req, res, next)=>{
//     // check header or url parameters or post parameters for token
//     console.log(req.body);
//     var token = req.body.token || req.query.token || req.headers['x-access-token'];
//     if(token){
//       console.log("token");
//       jwt.verify(token,"samplesecret",(err,decod)=>{
//         if(err){
//           res.status(403).json({
//             message:"Wrong Token"
//           });
//         }
//         else{
//           console.log("success");
//           req.decoded=decod;
//           next();
//         }
//       });
//     }
//     else{
//       res.status(403).json({
//         message:"No Token"
//       });
//     }
// });

app.get('/logout', function(req, res){
  req.session.destroy(function(err){
    res.json({success: true});
  })
});

app.get('/usersapi', function (req, res){
   // check header or url parameters or post parameters for token
  //  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;
  //  console.log(req.headers.authorization);
  // console.log(token);
   // decode token
  //  if (token) {
 
  //    // verifies secret and checks exp
  //    jwt.verify(token, 'shhhhh', function(err, decoded) {      

    connection.query('SELECT username, first_name, last_name FROM users',function (error, results, fields) {
    if (error) throw error;
    console.log(results);
  res.json(results);
  // })
})

  // else{
  //   console.log("unsuccessful because no token");
  // }
});

app.get('/uploads/:id', function (req, res){
    console.log(req.sessions);
    var fileName = req.params.id;
    var filePath = path.join(__dirname+'/uploads/', fileName);
    console.log("line 189" + filePath);
    // res.writeHead(200);
    const stat = fs.statSync(filePath)
    const fileSize = stat.size
    const range = req.headers.range
    console.log(stat + ' ' + fileSize + ' ' + range);
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] 
        ? parseInt(parts[1], 10)
        : fileSize-1
      const chunksize = (end-start)+1
      const file = fs.createReadStream(filePath, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/webm',
      }
      res.writeHead(206, head);
      console.log('range true');
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/webm',
      }
      console.log('range not true');
      res.writeHead(200, head)
        // This line opens the file as a readable stream
      var readStream = fs.createReadStream(filePath);

        // This will wait until we know the readable stream is actually valid before piping
      readStream.on('open', function () {
      // This just pipes the read stream to the response object (which goes to the client)
      readStream.pipe(res);
      console.log('piping');
      });

       // This catches any errors that happen while creating the readable stream (usually invalid names)
      readStream.on('error', function(err) {
        res.end(err);
      });
    }
  });

//route to get friends by username
app.get("/friends/:name", function(req,res){
  var search = req.params.name;
  console.log(search);
  connection.query(`SELECT id, username, first_name, last_name FROM users WHERE username LIKE ?`,['%'+search+'%'],function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.json(results);
  });
});

app.post("/uploadFile", function(request,response) {
  var uri = url.parse(request.url).pathname,
      filename = path.join(process.cwd(), uri);
  console.log('line 223 file name = ' + filename);
  var isWin = !!process.platform.match(/^win/);

  if (filename && filename.toString().indexOf(isWin ? '\\uploadFile' : '/uploadFile') != -1 && request.method.toLowerCase() == 'post') {
      uploadFile(request, response);
      console.log('after uploadFile function 228');
      return;
  }

  fs.exists(filename, function(exists) {
      if (!exists) {
          response.writeHead(404, {
              'Content-Type': 'text/plain'
          });
          response.write('404 Not Found: ' + filename + '\n');
          response.end();
          return;
      }

      if (filename.indexOf('favicon.ico') !== -1) {
          return;
      }

      if (fs.statSync(filename).isDirectory() && !isWin) {
          filename += '/index.html';
      } else if (fs.statSync(filename).isDirectory() && !!isWin) {
          filename += '\\index.html';
      }
      console.log('line 226 = ' + filename);
      fs.readFile(filename, 'binary', function(err, file) {
          if (err) {
              response.writeHead(500, {
                  'Content-Type': 'text/plain'
              });
              console.log(err);
              response.write(err + '\n');
              response.end();
              return;
          }

          var contentType;

          if (filename.indexOf('.html') !== -1) {
              contentType = 'text/html';
          }

          if (filename.indexOf('.js') !== -1) {
              contentType = 'application/javascript';
          }

          if (contentType) {
              response.writeHead(200, {
                  'Content-Type': contentType
              });
          } else response.writeHead(200);

          response.write(file, 'binary');
          response.end();
      });
  });
});

function uploadFile(request, response) {
  console.log("start of uploadFile");
  console.log("request = " + request);
  console.log("response = " + response);
  // parse a file upload
  var mime = require('mime');
  var formidable = require('formidable');
  var util = require('util');

  var form = new formidable.IncomingForm();

  var dir = !!process.platform.match(/^win/) ? '\\uploads\\' : '/uploads/';

  form.uploadDir = __dirname + dir;
  form.keepExtensions = true;
  form.maxFieldsSize = 10 * 1024 * 1024;
  form.maxFields = 1000;
  form.multiples = false;

  form.parse(request, function(err, fields, files) {
      if(err) throw err;
      var file = util.inspect(files);

      response.writeHead(200, getHeaders('Content-Type', 'application/json'));

      var fileName = file.split('path:')[1].split('\',')[0].split(dir)[1].toString().replace(/\\/g, '').replace(/\//g, '');
      var fileURL = 'http://localhost:' + PORT + '/uploads/' + fileName;
      console.log(fileName);
      console.log('fileURL: ', fileURL);
      //create a function to write file name location to conversations SQL table

      //placeholder variables
      var user_one_id = '1';
      var user_two_id = '2';
      var title = 'test title';
      var content = 'no content for now';
      console.log('line 337 filename: ' + fileName + ' ...... fileURL: ' + fileURL);
      createConversation(user_one_id, user_two_id, title, content, fileName)
      response.write(JSON.stringify({
          fileURL: fileURL
      }));
      response.end();
  });
}

function getHeaders(opt, val) {
  try {
      var headers = {};
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = true;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";

      if (opt) {
          headers[opt] = val;
      }

      return headers;
  } catch (e) {
      return {};
  }
}

function createConversation(user_one_id, user_two_id, title, content, filePath){
  connection.query("INSERT INTO conversations (user_one_id, user_two_id, title, content, fs_path) VALUES (?, ?, ?, ?, ?)", [user_one_id, user_two_id, title, content, filePath],function (error, results, fields) {
    if(error) throw error;
    console.log(results);
  });
}
app.listen(PORT, function() {
  console.log('🌎 ==> Now listening on PORT %s! Visit http://localhost:%s in your browser!', PORT, PORT);
});



