const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname + '/public/index2.html')
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
var exphbs = require('express-handlebars');




app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));



app.get('/', (req, res) => {
   
  res.render('index');
});

app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/public/index2.html');
});


app.get('/signup', (req, res) => {
  res.render('signup');
});

io.on('connection', (socket) => {
  console.log("A new user just connected");

  socket.on('disconnect', (socket) => {
    console.log('User was disconnected');
  })
});

server.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
})

