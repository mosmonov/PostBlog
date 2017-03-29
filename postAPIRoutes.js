const express = require('express');

const router = express.Router();

//pull in Post model
const Post = require('./post')

router.get('/post', (request, response, next) => {
	response.header('Content-Type', 'application/json');
	Post.get()
		.then((posts) => response.send(posts))
		.catch(next)
});
// ^^ next is functioning in the same way as err does? next access to the next middleware?

router.post('/post', (request, response, next) => {

	const id = parseInt(request.params.id, 10);

	const payload = request.body;

	response.header('Content-Type', 'application/json');
	Post.create(payload)
		.then((post) => response.send(post))
		.catch(next)
});

router.delete('/post', (request, response, next) => {
	const id = parseInt(request.params.id, 10);

	const payload = request.body;

	response.header('Content-Type', 'application/json');
	Post.remove(payload)
		.then((post) => response.send(post))
		.catch(next)
});

router.put('/post/:id', (request, response, next) => {

	const id = parseInt(request.params.id, 10);

	const payload = request.body;

	response.header('Content-Type', 'application/json');
	Post.set(payload)
		.then((post) => response.send(post))
		.catch(next)
});

//handle errors
router.use(function (err, req, res, next) {
	
})

module.exports=router;	