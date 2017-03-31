const express = require('express');

const router = express.Router();

const postList = require('./postList')


// body parser middleware
const parser = require('body-parser');

//parses requests with the content type of `application/json`
router.use(parser.json());

//define a route on `/hello/world`
router.get('/post',(request, response, next) => {
	next();
});



// post blog
router.post('/post', (request, response, next) => {
	const requestBody = request.body;

	// Add a post
	postList.createItem(requestBody);

	next();

});



// put blog
router.put('/post/:id', (request, response, next) => {
	// console.log('HERE')
	const id = parseInt(request.params.id, 10);
	const dataPayload = request.body;

	postList.setItem(id, 'data.post', dataPayload.post);
	postList.setItem(id, 'data.postText', dataPayload.postText);
	next();
}); // blog
 

// delete blog
router.delete('/post/:id', (request, response, next) => {
	const id = parseInt(request.params.id, 10);

	postList.removeItem(id);

	next();
}); 

// delete

router.use((request, response) => {
	response.header('Content-Type', 'application/json');

	const promise = postList.getItems()
	promise.then((res) => {
		response.send(res);	
	})
});




module.exports = router;





