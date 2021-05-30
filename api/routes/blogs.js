const express = require('express');
const router = express.Router();

// Gets Blogs
router.get('/', (request, response, next) => {
	response.status(200).json({
		message: 'Handling GET requests to /blogs'
	});
});

// Creates a Blog
router.post('/', (req, res, next) => {
	const blog = {
		name: req.body.name,
		content: req.body.content,
		author: req.body.author
	};
	res.status(201).json({
		message: 'Handling POST requests to /blogs',
		createdBlog: blog
	});
});

// Individually calls a blog
router.get('/:blogId', (req, res, next) => {
	const id = req.params.blogId;

	if (id === 'special') {
		res.status(200).json({
			message: 'You are making it far',
			id: id
		});
	} else {
		res.status(200).json({
			message: 'You didnt make it'
		});
	}
});

//Updates a blog post
router.patch('/:blogId', (req, res, next) => {
	res.status(200).json({
		message: 'Updated Blog'
	});
});

//Deletes a Blog
router.delete('/:blogId', (req, res, next) => {
	res.status(200).json({
		message: 'Deleted Blog'
	});
});

module.exports = router;
