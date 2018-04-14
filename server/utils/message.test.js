const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		var fromW = 'gea';
		var text = 'garagreg';
		var res = generateMessage(fromW, text);
		expect(res.from).toEqual(fromW);
		expect(res.text).toEqual(text);
		expect(res.createdAt).toBeA('number');
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		var from = 'Bob';
		var lat = 123;
		var lon = 456;
		var url = `https://www.google.com/maps?q=${lat},${lon}`;
		var res = generateLocationMessage(from, lat, lon);
		expect(res).toInclude({from, url});
		expect(res.createdAt).toBeA('number');
	});
});