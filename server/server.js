const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public', );
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);// wrap the application using http.
var io = socketIO(server); // web socket server

var {generateMessage, generateLocationMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected...');
	
	socket.emit('newMessage',generateMessage('Admin', 'Welcome to chat app'));
	socket.broadcast.emit('newMessage',generateMessage('Admin', 'New user joined'));
	
	socket.on('createMessage', (message, callback) => {
		io.emit('newMessage', generateMessage(message.from, message.text));
		console.log('createMessage', message);
		callback('This is from the server.');// acknowledge
	});
	
	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude, coords.longitude));
	});
	
	socket.on('disconnect', () => {
		console.log('User was disconnected...')
	});
	
}); //register an event listener 

server.listen(port, () => {
	console.log(`Server is up on port ${port}...`);
});

