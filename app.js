const express = require('express');
const app = express();
const morgan = require('morgan');

const blogRoutes = require('./api/routes/blogs');
const formRoutes = require('./api/routes/form');

app.use(morgan('dev'));

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
