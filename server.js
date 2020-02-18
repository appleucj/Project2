var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var exphbs = require('express-handlebars');


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));


app.get('/', function (req, res) {
   
  res.render('index');
});

app.get('/chat', function (req, res) {
  res.sendFile(__dirname + '/public/index2.html');
});


app.get('/signup', function (req, res) {
  res.render('signup');
});

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});
