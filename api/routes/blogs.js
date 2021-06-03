const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Calls module from blog schema
const Blog = require('../models/blog');

// Gets Blogs
router.get('/', (req, res, next) => {
	Blog.find()
		.select('name content author _id ')
		.exec()
		//This gives the user more info as to what kind of request it is and the URL the blog can be found in.
		.then(docs => {
			const response = {
				coun: docs.length,
				blogs: docs.map(doc => {
					return {
						name: doc.name,
						content:
							doc.content,
						author: doc.author,
						_id: doc._id,
						request: {
							type:
								'GET',
							url:
								'http://localhost:8000/blogs/' +
								doc._id
						}
					};
				})
			};
			//   if (docs.length >= 0) {
			res.status(200).json(response);
			// } else {
			// 	res.status(404).json({
			// 		message: 'Blog is not found'
			// 	});
			// }
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
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
				message: 'Blog has been created!',
				createdBlog: {
					name: result.name,
					content: result.content,
					author: result.author,
					_id: result._id,
					request: {
						type: 'GET',
						ulr:
							'http://localhost:8000/blogs/' +
							result._id
					}
				}
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
		.select('name content author _id ')
		.exec()
		.then(doc => {
			console.log('Comes from ', doc);
			if (doc) {
				res.status(200).json({
					blog: doc,
					request: {
						type: 'GET',
						description:
							'http://localhost:8000/blogs/'
					}
				});
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
	const id = req.params.blogId;
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	Blog.update({ _id: id }, { $set: updateOps })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Blog has been changed',
				request: {
					type: 'GET',
					url:
						'http://localhost:8000/blogs/' +
						id
				}
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

//Deletes a Blog
router.delete('/:blogId', (req, res, next) => {
	const id = req.params.blogId;
	Blog.remove({ _id: id })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Blog has been deleted',
				request: {
					type: 'POST',
					url:
						'http://localhost:8000/blogs/',
					body: {
						name: 'String',
						content: 'String',
						author: 'String'
					}
				}
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

module.exports = router;
