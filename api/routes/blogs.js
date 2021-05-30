const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
	response.status(200).json({
		message: 'Handling GET requests to /blogs'
	});
});

router.post('/', (request, response, next) => {
	response.status(200).json({
		message: 'Handling POST requests to /blogs'
	});
});

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

router.patch('/:blogId', (req, res, next) => {
	res.status(200).json({
		message: 'Updated Blog'
	});
});

router.delete('/:blogId', (req, res, next) => {
	res.status(200).json({
		message: 'Deleted Blog'
	});
});

module.exports = router;
