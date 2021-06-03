const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const blogRoutes = require('./api/routes/blogs');
const formRoutes = require('./api/routes/form');

mongoose.connect(
	'mongodb+srv://alien-blog:' +
		process.env.MONGO_ATLAS +
		'@cluster0.0nzvu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// These headers allow you limit who has access to your API, remiving * and putting you domain will limit access even more. Cors errors handled too
app.use((res, req, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header(
			'Access-Control-Allow-Methods',
			'PUT, POST,PATCH, DELETE, GET'
		);
		return res.status(200).json({});
	}
	next();
});

// This routes hand requests
app.use('/blogs', blogRoutes);
app.use('/form', formRoutes);

// If user does not choose one of the two routers throw error
app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

//Handles all errors or errors that come out in other parts of the blog
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;
