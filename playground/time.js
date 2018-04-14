// Jan 1st 1970 00:00:00 am

const moment = require('moment');

// var date = new Date();
// var months = ['Jan', 'Feb', 'Mar', 'Apr'];
// console.log(date.getMonth()); // 0-11

// var date = moment();
// date.add(1, 'years');
// console.log(date.format('MMM Do, YYYY')); // pass inside the pattern

// 06:05 am

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 12346;
var date = moment(createdAt);
console.log(date.format('h:mm a'));
