const expect = require('expect');

var {generateMessage} = require('./message');

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