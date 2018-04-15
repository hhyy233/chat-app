var socket = io();

function scrollToBotton() {
	// Selectors
	var messages = jQuery('#messages');
	var newMessage = messages.children('li:last-child');
	// Height
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();
	
	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight>= scrollHeight){
		// console.log('Should scroll');
		messages.scrollTop(scrollHeight); // auto scroll to the button
	}
}

socket.on('connect', function () {
	console.log('Connected to server');
	
	// socket.emit('createMessage', {
		// from: 'jen',
		// text: 'Hello'
	// });
});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#message-template').html(); // return the markup inside the template
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});
	
	jQuery('#messages').append(html);
	scrollToBotton();
	
	// console.log('New message', message);
	// var formattedTime = moment(message.createdAt).format('h:mm a');
	// var li = jQuery('<li></li>');
	// li.text(`${message.from} ${formattedTime}: ${message.text}`);
	// jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#location-message-template').html();
	var html = Mustache.render(template, {
		from: message.from,
		createdAt: formattedTime,
		url: message.url
	});
	jQuery('#messages').append(html);
	scrollToBotton();
	
	// var formattedTime = moment(message.createdAt).format('h:mm a');
	// var li = jQuery('<li></li>');
	// var a = jQuery('<a target="_blank">My current location</a>');
	// li.text(`${message.from} ${formattedTime}: `);
	// // a.attr('target');//will return the attribute string
	// a.attr('href', message.url);
	// li.append(a);
	// jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
	e.preventDefault();
	
	var messageTextbox = jQuery('[name=message]');
	
	socket.emit('createMessage', {
		from: 'User',
		text: messageTextbox.val()
	}, function () {
		messageTextbox.val(''); // clear the input
	})
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
	if(!navigator.geolocation){
		return alert('Geolocation not supported by your browser.');
	}
	
	locationButton.attr('disabled', 'disabled').text('Sending location...');
	
	navigator.geolocation.getCurrentPosition(function (position) {
		locationButton.removeAttr('disabled').text('Send location');// remove disabled
		// console.log(position);
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function (err) {
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch location.');
	});
	
});

// socket.emit('createMessage', {
	// from: 'John',
	// text: 'Hello'
// }, function (data) {
	// console.log('Got it', data);
// });
