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
var morgan = require('morgan');
var path = require("path");
var jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');
var PORT = process.env.PORT || 3001;
var app = express();

// set the app up with bodyparser
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  app.use(express.static('client/build'));
}
else app.use(express.static("public"));

/*
  if we don't do this here then we'll get this error in apps that use this api

  Fetch API cannot load No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

  read up on CORs here: https://www.maxcdn.com/one/visual-glossary/cors/
*/
  //allow the api to be accessed by other apps
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
});

// use morgan to log requests to the console
app.use(morgan('dev'));

// Initializes the connection variable to sync with a MySQL database
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,  
    database: process.env.DB_NAME   
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
    // console.log(results);
    if (results.length == 0){
      // console.log("no such user");
      res.json({success: false});
    }
    else {
      bcrypt.compare(password, results[0].password, function(err, result) {
      if (result == true){
        //payload of jwt token
        var payload = {
          id: results[0].id,
          username: results[0].username
        };
        // console.log(payload);
        var token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });
        // return the information including token as JSON
        res.status(200).json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
            id: payload.id
        });
      }
      else{
        // console.log("did not get session");
        res.status(403).json({success: false});;
      }
      });
    }
  });
});

app.post("/check-login", verifyToken, function(req,res){
    // console.log("check-login: " + req.decoded);
    res.status(200).json({
      success: true
  });
});


//need to rework below route
//may need async/await and connection pool
app.post("/signup", (req,res) => {
    console.log(req.body);
    let email = req.body.user.email;
    let firstName = req.body.user.firstName;
    let lastName = req.body.user.lastName;
    let username = req.body.user.username;
    let password = req.body.user.password;
    let groupName = req.body.user.groupName;
    let phone = req.body.user.phone;
    let inviteArr = req.body.user.groupList;

    Promise.all([userCheck(username),emailCheck(email),groupCheck(groupName)])
    .then(([res1,res2,res3])=>{
      if(res1 && res2 && res3)
      {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(password, salt, function(err, p_hash) {
            connection.query('INSERT INTO users (username, password, first_name, last_name, email, phone) VALUES (?,?,?,?,?,?)', [username, p_hash, firstName, lastName, email, phone],function (error, usersResults, fields) {
              if (error) throw error;
              // console.log(usersResults);
              connection.query('SELECT id, username FROM users WHERE username = ?', [username],function (error, results, fields) {
                if(error) throw error;
                // console.log(results[0].id);
                var payload = {
                  id: results[0].id,
                  username: results[0].username
                };
                console.log(payload);
                var token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });
                res.status(200).json({
                  success: true,
                  message: 'Enjoy your token!',
                  token: token,
                  id: payload.id
                });
                connection.query('INSERT INTO group_name (group_name, members) VALUES (?,?)', [groupName, inviteArr.length+1],function (error, groupResults, fields) {
                  if (error) throw error;
                  connection.query('SELECT id, group_name FROM group_name WHERE group_name = ?', [groupName],function (error, res, fields) {
                    if(error) throw error;
                    let group_id = res[0].id;
                    for(let i = 0; i < inviteArr.length; i++)
                    {
                    connection.query('INSERT INTO invites (group_id, email) VALUES (?,?)', [group_id,inviteArr[i]],function (error, invitesResults, fields) {
                      if (error) throw error;
                          connection.query('INSERT INTO users_groups_relations (user_id, group_id) VALUES (?,?)', [payload.id,group_id],function (error, invitesResults, fields) {
                          if (error) throw error;
                          
                          })
                    })
                    }
                  });
                })
              });                 
            });
          });
        });
      }
      else
      {
        console.log('dup somewhere');
        res.status(200).json({
          success: false,
          message: 'Duplicate Somewhere!',
        });
      }
    });
  });

    //then check if groupName exists (availability should be reflected to front end as user inputs groupName)

    //if all checks pass, insert into users table, then groups table, then invites table, then users_groups relations

//true is available, false is NOT available
function userCheck(username){
  console.log("at userCheck");
  return new Promise(function(resolve, reject) {
    connection.query("SELECT * FROM users WHERE username = ?", [username],function (error, results, fields) {
      if(error) return reject(error);
      if(results.length == 0)
      {
        console.log("no duplicate username");
        resolve(true);
      }
      else
      {
        console.log("duplicate username FOUND");
        resolve(false);
      }
    });
  });
};

function emailCheck(email){
  console.log("at emailCheck");
  return new Promise(function(resolve, reject) {
  connection.query("SELECT * FROM users WHERE email = ?", [email],function (error, results, fields) {
    if(error) return reject(error);
    if(results.length == 0)
    {
      console.log("no duplicate email");
      resolve(true);
    }
    else
    {
      console.log("duplicate email FOUND");
      resolve(false);
    }
  });
  })
};

function groupCheck(groupName){
  return new Promise(function(resolve, reject) {
  connection.query("SELECT * FROM group_name WHERE group_name = ?", [groupName],function (error, results, fields) {
    if(error) return reject(error);
    if(results.length == 0)
    {
      // console.log("no duplicate username or email" + password.length);
      resolve(true);
    }
    else
    {
      resolve(false);
    }
  });
  });
};


// ALL AUTHENTICATED ROUTE GOES BELOW THIS
function verifyToken(req, res, next) {
  // check header or url parameters or post parameters for token
  // console.log("verify token reqbody: " + req.body.token);
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // console.log("verify token: " + token);
  if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decod) => {
          if (err) {
              res.status(403).json({
                  message: "Wrong Token"
              });
          } 
          else {
              req.decoded = decod;
              next();
          }
      });
  } 
  else {
      res.status(403).json({
          message: "No Token"
      });
  }
};

app.get('/logout', function(req, res){
    res.json({success: true});
});

//unsure if below route is needed
app.get('/usersapi',verifyToken, function (req, res){
    connection.query('SELECT username, first_name, last_name FROM users',function (error, results, fields) {
    if (error) throw error;
    // console.log(results);
  res.json(results);
  })
});

app.get('/uploads/:id', function (req, res){
    // console.log(req.sessions);
    var fileName = req.params.id;
    var filePath = path.join(__dirname+'/uploads/', fileName);
    // console.log("line 189" + filePath);
    // res.writeHead(200);
    const stat = fs.statSync(filePath)
    const fileSize = stat.size
    const range = req.headers.range
    // console.log(stat + ' ' + fileSize + ' ' + range);
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
      // console.log('range true');
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/webm',
      }
      // console.log('range not true');
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

app.get("/friends",verifyToken, function(req,response){
    //userId is going to be the user's id
    var userId = req.decoded.id;
    getFriends(userId).then(res => {
      // console.log(res);
      if(res.length == 0)
      {
        var result = [];
        response.status(200).json(result);
      }
      else
      {
        var query = res.toString();
        // console.log(query);
        //need to add condition where query is empty
        connection.query(`SELECT id, username FROM users WHERE id IN (${query})`,function (err, results, fields2) {
          if(err) throw err;
          // console.log(results);
          response.status(200).json(results); 
        });
      } 
    });
});

//route to get friends by username
app.get("/friends/:name",verifyToken, function(req,res){
  var search = req.params.name;
  let username = req.decoded.username;
  // console.log(search);
  connection.query(`SELECT id, username, first_name, last_name FROM users WHERE username LIKE ? AND username NOT LIKE ?`,[search+'%', username],function (error, results, fields) {
    if (error) throw error;
    // console.log(results);
    res.json(results);
  });
});


//route to get all conversations related to one user
app.get("/conversations_archive",verifyToken, function(req,response){
  let user_id = req.decoded.id; 
  getConversation(user_id, 'archive').then(res => {
    // console.log(res);    
    response.json(res);
  });
});

//need to add info to get conversation reply table info as well
app.get("/conversations_active",verifyToken, function(req,response){
  let user_id = req.decoded.id; 
  getConversation(user_id, 'active').then(res => {
    // console.log(res);
    response.json(res)
  });
});

app.get("/relevant_thoughts/:id",verifyToken, function(req,response){
  // console.log("here at relevant_thoughts" + req.params.id);
  getAllThoughts(req.params.id).then(res => {
    // console.log(res);
    response.json(res);
  });
});

app.post("/archive/:id",verifyToken, function(req,res){
  //let id be conversation id
  let id = req.params.id;
  // console.log("archive route conv id: " + id);
  connection.query(`UPDATE conversations SET stat = 'archive' WHERE id = ?`, [id], function (err, results, fields){
    if(err) throw err;
    // console.log(results);
    res.json(results);
  });
});

app.post("/friends/:id",verifyToken, function(req,res){
  var id = req.params.id;
  //userId to be sent via body with jsonwebtoken
  var userId = req.decoded.id;
  // console.log(id);
  connection.query(`INSERT INTO contacts (user_id,friend_id) VALUES (?,?)`,[userId,id],function (error, results, fields) {
    if (error) throw error;
    // console.log(results);
    res.json(results);
  });
});

//below route only needed for uploading to server's local hard drive, not in use currently but saved for future reference
app.post("/uploadFile",verifyToken, function(request,response) {
  // var uri = url.parse(request.url).pathname,
  //     filename = path.join(process.cwd(), uri);
  // var isWin = !!process.platform.match(/^win/);

  // if (filename && filename.toString().indexOf(isWin ? '\\uploadFile' : '/uploadFile') != -1 && request.method.toLowerCase() == 'post') {
  //     uploadFile(request, response);
  //     console.log('after uploadFile function 228');
  //     return;
  // }

  // fs.exists(filename, function(exists) {
  //     if (!exists) {
  //         response.writeHead(404, {
  //             'Content-Type': 'text/plain'
  //         });
  //         response.write('404 Not Found: ' + filename + '\n');
  //         response.end();
  //         return;
  //     }

  //     if (filename.indexOf('favicon.ico') !== -1) {
  //         return;
  //     }

  //     if (fs.statSync(filename).isDirectory() && !isWin) {
  //         filename += '/index.html';
  //     } else if (fs.statSync(filename).isDirectory() && !!isWin) {
  //         filename += '\\index.html';
  //     }
  //     console.log('line 226 = ' + filename);
  //     fs.readFile(filename, 'binary', function(err, file) {
  //         if (err) {
  //             response.writeHead(500, {
  //                 'Content-Type': 'text/plain'
  //             });
  //             console.log(err);
  //             response.write(err + '\n');
  //             response.end();
  //             return;
  //         }

  //         var contentType;

  //         if (filename.indexOf('.html') !== -1) {
  //             contentType = 'text/html';
  //         }

  //         if (filename.indexOf('.js') !== -1) {
  //             contentType = 'application/javascript';
  //         }

  //         if (contentType) {
  //             response.writeHead(200, {
  //                 'Content-Type': contentType
  //             });
  //         } else response.writeHead(200);

  //         response.write(file, 'binary');
  //         response.end();
  //     });
  // });
});

//this is actual route that relates all users in a particular conversation
app.post("/uploadFile2",verifyToken, function(req,res) {
  // console.log(req.body.title);
  // console.log(req.body.content);
  // console.log("upload 2: " + req.decoded.id);
  let users = req.body.users;
  users.push(req.decoded.id);
  // console.log(users);
  createConversation(req.decoded.id, req.body.title, req.body.content, req.body.id).then(
    response => {
      // console.log("396: " + response);
      for(var i = 0; i < users.length; i++)
      {
        createConversationRelations(response,users[i]);
      }
    res.json({success: true});
    }
  );
});

app.post("/conversation_reply",verifyToken, function(req,res){
  //all I need is create a conversation reply
  // console.log(req.body.user_id);
  // console.log(req.body.content);
  // console.log(req.body.conv_id);
  // console.log(req.body.id);
  // console.log(req.decoded);
  connection.query("INSERT INTO conversations_reply (user_id, content, fs_path, c_id_fk) VALUES (?, ?, ?, ?)", [req.decoded.id, req.body.content, req.body.id, req.body.conv_id],function (error, results, fields) {
    if(error) throw error;
    // console.log("conv_reply " + results.insertId);
    res.json({success:true});
  })
});

//below function not needed currently, works in conjunction with /uploadFile
function uploadFile(request, response) {
  // console.log("start of uploadFile");
  // console.log("request = " + request.body);
  // console.log("response = " + response);
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
  // console.log("405: " + JSON.stringify(form.parse(request)));
  form.parse(request, function(err, fields, files) {
      if(err) throw err;
      var file = util.inspect(files);
      // console.log(file);
      response.writeHead(200, getHeaders('Content-Type', 'application/json'));
      // var params = {Bucket: S3_BUCKET, Key: 'key', Body: 'test'};
      // s3.upload(params, function(err, data) {
          // console.log(err, data);
      // });
      var fileName = file.split('path:')[1].split('\',')[0].split(dir)[1].toString().replace(/\\/g, '').replace(/\//g, '');
      var fileURL = 'http://localhost:' + PORT + '/uploads/' + fileName;
      console.log(fileName);
      console.log('fileURL: ', fileURL);
      //create a function to write file name location to conversations SQL table

      //placeholder variables
      // var user_one_id = '1';
      // var user_two_id = '2';
      // var title = 'test title';
      // var content = 'no content for now';
      console.log('line 337 filename: ' + fileName + ' ...... fileURL: ' + fileURL);
      // createConversation(user_one_id, user_two_id, title, content, fileName)
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
};

function createConversation(user_one_id, title, content, filePath){
  return new Promise(function(resolve, reject) {
    connection.query("INSERT INTO conversations (user_one_id, title, content, fs_path, stat) VALUES (?, ?, ?, ?, ?)", [user_one_id, title, content, filePath, 'active'],function (error, results, fields) {
      if(error) return reject(error);
      // console.log("468: " + results.insertId);
      resolve(results.insertId);
    });
  })
};

function createConversationRelations(conversation_id, user_id){
  // console.log(conversation_id + " ......... " + user_id);
  connection.query("INSERT INTO conversation_relation VALUES (?,?)",[conversation_id, user_id], function (err, res, fields){
    if(err) throw err;
    // console.log(res);
    return res.insertId;
  })
}
function getFriends(id){
  return new Promise(function(resolve, reject) {
    connection.query(`SELECT user_id, friend_id FROM contacts WHERE user_id = ?`,[id],function (error, results, fields) {
      if (error) return reject(error);
      // console.log('how many friends I have: ' + results.length);
      var arr = [];
      for(var i = 0; i < results.length; i++)
      {
        // console.log(results[i].friend_id);
        arr.push(results[i].friend_id);

      }
      // console.log('get friends line 444: ' + arr);
      resolve(arr);
    });
  })
};

//idea is to get all filepaths of all video and send it to front-end; front-end stores filepaths in array 
function getConversation(user_id, status){
  return new Promise(function(resolve, reject) {
    connection.query(`SELECT conversations.id, conversations.user_one_id, conversations.title, conversations.content, conversations.fs_path, users.username FROM conversations INNER JOIN conversation_relation ON conversations.id = conversation_relation.conversation_id INNER JOIN users ON conversations.user_one_id = users.id WHERE user_id = ? AND stat = ?`, [user_id, status],function (error, results, fields) {
      if (error) return reject(error);
        // console.log(results);
      resolve (results);
    });
  })
};

function getAllThoughts(conv_id){
  return new Promise(function(resolve, reject) {
  connection.query(`SELECT conversations_reply.fs_path FROM conversations_reply WHERE conversations_reply.c_id_fk = ?`,[conv_id],function(err,res,fields){
    if(err) return reject(err);
    // console.log(res);
    resolve(res);
  })
})
};

app.listen(PORT, function() {
  console.log('🌎 ==> Now listening on PORT %s! Visit http://localhost:%s in your browser!', PORT, PORT);
});