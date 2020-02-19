const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
// Requiring our models for syncing
const db = require("./models");

const publicPath = path.join(__dirname + '/public/index2.html')
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
var exphbs = require('express-handlebars');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Static directory

// =============================================================
app.get("/", (req, res) => res.send("Welcome to our Chat"))
app.post("/api/users", (req, res) => {
db.User.create(req.body).then(user => {
  res.json(user)
})
});
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log("App listening on PORT " + port);
  });
});




app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));



app.get('/', function(req, res) {
   
  res.render('index');
});

app.get('/chat', function(req, res) {
  res.sendFile(__dirname + '/public/index2.html');
});


app.get('/signup', function(req, res)  {
  res.render('signup');
});
//consolelog connections
io.on('connection', function(socket) {
  //console.log('a user connected');
  socket.on('disconnect', (socket) => {
    //console.log('user disconnected');
  })

  socket.on('chat message', function (msg)  {
    console.log('Hello World from chat message on the server!')
    socket.emit('new message', msg)
  });
  

});
//emit messages
// io.on('chat message', (socket) => {
 
// })


