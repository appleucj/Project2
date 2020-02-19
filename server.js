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
//consolelog connections
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', (socket) => {
    console.log('user disconnected');
    
  })
});
//emit messages
io.on('connection', (socket) => {
  socket.emit('greeting-from-server',{
    greeting: 'Hello Client'
  });
  socket.on('greeting-from-client', (message) => {
    console.log(message);
  })
})

server.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
})

