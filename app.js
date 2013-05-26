
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
app.set('port', process.env.PORT || 8888);
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

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//Socket.io Server
io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('foobar', function (data) {
    console.log(data);
  });
});
