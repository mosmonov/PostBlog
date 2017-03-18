//access db
const low = require('lowdb');

//instantiate db
const db = low('./db.json');

//default
db.defaults({ posts: []}).write();

//table name helper
const POST_TABLE_NAME = 'posts';

const Post = {};

Post.get = () => {
	return new Promise((resolve, reject) => {
		resolve(db.get(POST_TABLE_NAME).value());
	});
}; //get

Post.create = (postData) => {
	return new Promise((resolve, reject) => {
		const newPost = {
			id: Date.now(),
			data: postData
		};
		db.get(POST_TABLE_NAME)
			.push(newPost)
			.write();

		resolve(newPost);
	});
};
Post.remove = (postData) => {
	return new Promise((resolve, reject) => {
		const newPost = {
			id: Date.now(),
			data: postData
		};
		db.get(POST_TABLE_NAME)
			.remove(newPost)
			.write();

		resolve(newPost);
	});
};
Post.set = (postData) => {
	return new Promise((resolve, reject) => {
		const newPost = {
			id: Date.now(),
			data: postData
		};
		db.get(POST_TABLE_NAME)
			.find(newPost)
			.set('data.isDone', newPost.isDone)
			.write();

		resolve(newPost);
	});

};
module.exports=Post;




