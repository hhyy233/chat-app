const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public', );
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app); // wrap the application using http.
var io = socketIO(server); // web socket server

var {
  generateMessage,
  generateLocationMessage
} = require('./utils/message');
var {
  isRealString
} = require('./utils/validation');
const {
  Users
} = require('./utils/users');

var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected...');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    socket.join(params.room);

    users.removeUser(socket.id); // good
    users.addUser(socket.id, params.name, params.room);
    console.log(`${params.name} joins room ${params.room}`);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    //socket.leave(param);

    // io.emit() -> io.to(room).emit()
    // socket.broadcast.emit() -> socket.broadcast.to(room).emit()
    // socket.emit()

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

    callback('');
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
      console.log(`${user.name}: ${user.room}: ${message.text}`);
      callback(); // acknowledge
    }

  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
    console.log(`${user.name} was disconnected...`);
  });

}); //register an event listener

server.listen(port, () => {
  console.log(`Server is up on port ${port}...`);
});
