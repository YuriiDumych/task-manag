const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const user = require('./routes/user')
const task = require('./routes/task');
const passport = require('passport');
const socket = require('socket.io');
const app = express();
const server = require('http').Server(app);
const io = socket(server);


require('dotenv').config();
app.use(passport.initialize());
require('./passport')(passport);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/front-end/build'));
app.use('/api/users', user);
app.use('/api/task', task);

const onlineUsers = [];

io.on('connection', socket => {
  onlineUsers.push({socket});
  socket.on('setEmail', email => {
    const index = onlineUsers.findIndex(item => item.socket.id === socket.id);
    if(index > -1){
      onlineUsers[index].email = email;
    }
  })
  socket.on('disconnect', () => {
    const index = onlineUsers.findIndex(item => item.socket.id === socket.id);
    if(index > -1){
      onlineUsers.splice(index, 1)
    }
  })
  socket.on('shareTask', obj => {
    const index = onlineUsers.findIndex(item => item.email === obj.user);
    if(index > -1){
      onlineUsers[index].socket.emit('addTask', obj);
    }
  })
})


mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then(() => console.log('Database is connected'))
  .catch(err => console.log('Cannot connect to database \n' + err))

  
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/front-end/build/index.html')
})

server.listen(process.env.PORT || 5000, () => console.log('server is running'))