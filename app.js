
/**
 * Module dependencies.
 */

var express = require('express')
  , app = express()  
  , routes = require('./routes')
  , user = require('./routes/user')
  , server = require('http').createServer(app)
  , path = require('path')
  , io = require('socket.io').listen(server);



// all environments
app.set('port', process.env.TEST_PORT || 8080);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Routes
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

app.get('/remote', function (req, res) {
  res.sendfile(__dirname + '/public/remote.html');
});

//Socket.io Congfig
io.set('log level', 1);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var ss;

//Socket.io Server
io.sockets.on('connection', function (socket) {
 
 socket.on("screen", function(data){
   socket.type = "screen";
   ss = socket;
   console.log("Screen ready...");
 });
 socket.on("remote", function(data){
   socket.type = "remote";
   console.log("Remote ready...");
 });
 
 socket.on("controll", function(data){
	console.log(data);
   if(socket.type === "remote"){
     
     if(data.action === "tap"){
      ss.emit("controlling", {action:"enter"}); 
     }
     else if(data.action === "swipeLeft"){
      ss.emit("controlling", {action:"goLeft"}); 
     }
     else if(data.action === "swipeRight"){
       ss.emit("controlling", {action:"goRight"}); 
     }
   }
 });
});
