const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public', );
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);// wrap the application using http.
var io = socketIO(server); // web socket server

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected...');
	
	socket.on('disconnect', () => {
		console.log('User was disconnected...')
	});
	
	socket.on('createMessage', (newMessage) => {
		console.log('createMessage', newMessage);
		
		var message = {
			from: newMessage.from,
			text: newMessage.text,
			createdAt: new Date()
		}
		socket.emit('newMessage', message);
	});
	
}); //register an event listener 

server.listen(port, () => {
	console.log(`Server is up on port ${port}...`);
});

