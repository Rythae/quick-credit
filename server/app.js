import express from 'express';
import morganLogger from 'morgan';
import bodyParser from 'body-parser';

const app = express();

app.use(morganLogger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	return res.status(200).send({
		message: 'Welcome to Quick Credit!!!'
	});
});

app.get('*', async(req, res) => {

	const users = {id: 1};
	const newUser = await [{...users}];

	return res.status(404).send({
		message: 'Route not found',
		users
	});
});

export default app;