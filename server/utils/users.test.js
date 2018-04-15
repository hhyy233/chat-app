const expect = require('expect');

var {Users} = require('./users');

describe('Users', () => {
	
	var users;
	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'ka',
			room: 'C1'
		}, {
			id: '2',
			name: 'ge',
			room: 'S2'
		}, {
			id: '3',
			name: 'rr',
			room: 'C1'
		}]
	});
	
	it('should remove a user', () => {
		var user = users.removeUser('1');
		expect(user.id).toBe('1');
		expect(users.users.length).toBe(2);
		expect(users.users).toExclude(user);
	});
	
	it('should not remove user', () => {
		var user = users.removeUser('444');
		expect(user).toNotExist();
		expect(users.users.length).toBe(3);
	});
	
	it('should find user', () => {
		var user = users.removeUser('1');
		expect(user).toEqual({
			id: '1',
			name: 'ka',
			room: 'C1'
		});
	});
	
	it('should not find user', () => {
		var user = users.removeUser('444');
		expect(user).toNotExist();
	});
	
	it('should add new user', () => {
		var users = new Users();
		var user = {
			id: '123',
			name: 'dd',
			room: 'Roomname'
		};
		var resUser = users.addUser(user.id, user.name, user.room);
		expect(users.users).toEqual([user]);
	});
	
	it('should return names for C1 course', () => {
		var userList = users.getUserList('C1');
		expect(userList).toEqual(['ka','rr']);
	});
	
	it('should return names for S2 course', () => {
		var userList = users.getUserList('S2');
		expect(userList).toEqual(['ge']);
	});
	
});

