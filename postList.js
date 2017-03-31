//access db
const low = require('lowdb');

//instantiate db
const db = low('./db.json');

//default
db.defaults({ posts: []}).write();

//table name helper

const postList = {};

postList.getItems = () => {
	return new Promise((resolve, reject) => {
		resolve(db.get('posts').value());
	});
}; //get

postList.createItem = (postData) => {
	return new Promise((resolve, reject) => {
		// const post = {
		// 	id: Date.now(),
		// 	data: postData
		// };
		db.get('posts')
			.push({
			id: Date.now(),
		 	data: postData
			}).write();

		resolve();
	});
};
postList.removeItem = (id) => {
	return new Promise((resolve, reject) => {
		db.get('posts')
			.remove({ id })
			.write();

		resolve();
	});
};
postList.setItem = (id, key, propToUpdate) => {
	return new Promise((resolve, reject) => {
		db.get('posts')
			.find({ id })
			.set(key, propToUpdate)
			.write();

		resolve();
	});

};
module.exports= postList;




