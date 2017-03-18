const express = require('express');

const router = express.Router();

//pull in Post model
const Post = require('./post')

router.get('/', (request, response, next) => {
	response.header('Content-Type', 'application/json');
	Post.get()
		.then((posts) => response.send(posts))
		.catch(next)
});
// ^^ next is functioning in the same way as err does? next access to the next middleware?

router.post('/', (request, response, next) => {
	const payload = request.body;

	response.header('Content-Type', 'application/json');
	Post.create(payload)
		.then((post) => response.send(post))
		.catch(next)
});

router.delete('/', (request, response, next) => {
	const payload = request.body;

	response.header('Content-Type', 'application/json');
	Post.remove(payload)
		.then((post) => response.send(post))
		.catch(next)
});

router.put('/', (request, response, next) => {
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