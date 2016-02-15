var restify     =   require('restify');
var mongojs     =   require('mongojs');
var mongoose = require('mongoose');
var morgan  	=   require('morgan');
//bucketlistapp database, appUsers and bucketLists are collections (tables ish)
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
var db          =   mongojs('bucketlistapp', ['appUsers','bucketLists']);
var server      =   restify.createServer();

//init restify and enable logging (morgan)
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(morgan('dev')); // LOGGER

//enable cross origin request sharing so client can talk to any domain (i.e. my server)
server.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//start up server
server.listen(process.env.PORT || 9804, function(){
  console.log("Server started at",process.env.PORT || 9804);
});

var manageUsers = require('./auth/manageUser')(server, db);
var manageLists =   require('./list/manageList')(server, db);
