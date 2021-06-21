const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Form = require('../models/forms');

router.get('/', (req, res, next) => {
	Form.find()
		.select('name lastName message email')
		.exec()
		//This gives the user more info as to what kind of request it is and the URL the blog can be found in.
		.then(docs => {
			const response = {
				blogs: docs.map(doc => {
					return {
						name: doc.name,
						lastName:
							doc.lastName,
						message:
							doc.message,
						email: doc.email,
						_id: doc._id,
						request: {
							type:
								'GET',
							url:
								'http://localhost:8000/fomr/' +
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

router.post('/', (req, res, next) => {
	const form = new Form({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		lastName: req.body.lastName,
		message: req.body.message,
		email: req.body.email
	});
	form.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: 'Your message was sent!',
				createdForm: {
					name: result.name,
					lastName: result.lastName,
					message: result.message,
					email: req.body.email,
					_id: result._id,
					request: {
						type: 'GET',
						url:
							'http://localhost:8000/form/' +
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

module.exports = router;
