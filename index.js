const epxress = require('express')

const serveStatic = require('serve-static');

const postApi = require('./apiRoutes');

const app = express();

app.use('/', serveStatic('public', {
	'index': ['index.html']
}));

app.use('/api', postApi);

app.listen(3000, ()=> {
	console.log('Example app listening on port 3000!');
});