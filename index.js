//include express
const express = require('express');

//api routes
const postApi = require('./postAPIRoutes');

// create an express application
const app = express();

// use post api routes
app.use('/', express.static('public'));

//have the application listen on a specific port
app.listen(3000, () =>{
	console.log(' Example app listening on port 3000');
});