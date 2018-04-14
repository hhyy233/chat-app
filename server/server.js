const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public', );
const port = process.env.PORT || 3000;

// console.log(__dirname + '/../public');
// console.log(publicPath);

var app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});

