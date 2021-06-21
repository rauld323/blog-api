const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
// const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function(req, file, cb) {
		cb(null, new Date().toISOString() + file.originalname);
	}
});

const fileFilter = (req, file, cb) => {
	// reject a file
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
});

//Calls module from blog schema
const Blog = require('../models/blog');

// Gets Blogs
router.get('/', (req, res, next) => {
	Blog.find()
		.select('firstname content author _id blogImage')
		.exec()
		//This gives the user more info as to what kind of request it is and the URL the blog can be found in.
		.then(docs => {
			const response = {
				count: docs.length,
				blogs: docs.map(doc => {
					return {
						firstname:
							doc.firstname,
						content:
							doc.content,
						author: doc.author,
						blogImage:
							doc.blogImage,
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
router.post('/', upload.single('blogImage'), (req, res, next) => {
	const blog = new Blog({
		_id: new mongoose.Types.ObjectId(),
		firstname: req.body.firstname,
		content: req.body.content,
		author: req.body.author,
		blogImage: req.file.path
	});
	blog.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: 'Blog has been created!',
				createdBlog: {
					firstname: result.firstname,
					content: result.content,
					author: result.author,
					_id: result._id,
					request: {
						type: 'GET',
						url:
							'http://localhost:8000/blogs' +
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
		.select('firstname content author _id blogImage')
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
						firstname: 'String',
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
