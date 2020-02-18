var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
  console.log('Yay, connection was recorded')
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    io.emit('chat message', 'A user is connected');
    socket.on('disconnect', function() {
      io.emit('chat message', 'some user disconnected');
   });
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
