const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Calls module from blog schema
const Blog = require('../models/blog');

// Gets Blogs
router.get('/', (req, res, next) => {
	Blog.find()
		.exec()
		.then(docs => {
			console.log(docs);
			res.status(200).json(docs);
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
});

// Creates a Blog
router.post('/', (req, res, next) => {
	const blog = new Blog({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		content: req.body.content,
		author: req.body.author
	});
	blog.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message:
					'Handling POST requests to /blogs',
				createdBlog: result
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

// Individually calls a blog
router.get('/:blogId', (req, res, next) => {
	const id = req.params.blogId;
	Blog.findById(id)
		.exec()
		.then(doc => {
			console.log(doc);
			if (doc) {
				res.status(200).json(doc);
			} else {
				res.status(404).json({
					message:
						'ID did not match valid entry'
				});
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
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
