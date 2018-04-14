var socket = io();

socket.on('connect', function () {
	console.log('Connected to server');
	
	// socket.emit('createMessage', {
		// from: 'jen',
		// text: 'Hello'
	// });
});

socket.on('disconnect', function () {
	console.log('Disconnected from server')
});

socket.on('newMessage', function (message) {
	console.log('New message', message);
	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);
	
	jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
	// from: 'John',
	// text: 'Hello'
// }, function (data) {
	// console.log('Got it', data);
// });

jQuery('#message-form').on('submit', function (e) {
	e.preventDefault();
	
	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, function () {
		// console.log('');
	})
});