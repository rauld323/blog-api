const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: { type: String, required: true },
	lastName: { type: String, required: true },
	message: { type: String, required: true },
	email: {
		type: String,
		required: true,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	}
});

module.exports = mongoose.model('Forms', formSchema);
