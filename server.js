const express = require('express');
const path = require('path');

const publicPath = path.join(__dirname + '/public/index2.html')
var port = process.env.PORT || 3000;

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var exphbs = require('express-handlebars');




app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
})

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
  //console.log(`we are connected with SOCKEt --> ${socket}`)
});


// // server.listen(port, function () {
// //   console.log('listening on *:' + port);
// });
