var restify     =   require('restify');
var mongojs     =   require('mongojs');
var morgan  	=   require('morgan');
//bucketlistapp database, appUsers and bucketLists are collections (tables ish)
var db          =   mongojs('mongodb://remote-fyp-db:cccsadIJASfdpsapautyaxsYYa$@ec2-52-30-112-75.eu-west-1.compute.amazonaws.com:27017/dummyDB', ['appUsers','bucketLists']);
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
server.listen(process.env.PORT || 8080, function(){
  console.log("Server started at",process.env.PORT || 8080);
});

var manageUsers = require('./auth/manageUser')(server, db);
var manageLists =   require('./list/manageList')(server, db);
