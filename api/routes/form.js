const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Form = require('../models/forms');

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
						ulr:
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
