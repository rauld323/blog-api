const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
	const form = {
		formID: req.body.formID,
		name: req.body.name,
		lastname: req.body.lastname,
		message: req.body.message,
		email: req.body.email
	};
	res.status(201).json({
		message: 'Your form has been sent',
		form: form
	});
});

module.exports = router;
