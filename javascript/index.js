//include express
const express = require('express')

//grab db
const low = require('lowdb')

//static file server
const serveStatic = require('serve-static');

//body parser middleware
const app = express();

//instantiate db
const db = low('./db.json');

//parses request with the content type of 'application/json'
app.use(parse.json());

//define a route
app.get('api/todos',(request, response)=>{
	response.header('Content-Type', 'application/json');
	response.send(db.get('todos').value());
});

//post todos
app.post('/api/todos',(request, response)=>{
	const requestBody = request.body;

	//add a post
	db.get('todos').push({
		id: Date.now(),
		data:requestBody,
	}).write();
response.header('Content-Type', 'application/json');
response.end(db.get('todos').value());
});

app.put('/api/todo:id',(request, response)=>{
	const id=parseInt(request.params.id, 10)

	//add a put
	db.get('todos')
		.find({ id })
		.set('data.isDone', id.isDone)
		.write()
	response.header('Content-Type', 'application/json')
	response.end(db.get('todos').value());
});

app.delete('/api/todo:id', (request, response)=>{
	const id=parseInt(request.params.id, 10)

	//add a delete
	db.get('todos')
		.remove({ id })
		.write()

	response.header('Content-Type', 'application/json')
	response.end(db.get('todos').value());
});

app.use('/', serveStatic('public', {
	'index': [ 'index.html' ]
}));
app.listen(3000, () =>{
	console.log('Example app listening on port 3000!');
});












