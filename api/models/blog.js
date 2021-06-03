const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: { type: String, require: true },
	content: { type: String, require: true },
	author: { type: String, require: true }
});

module.exports = mongoose.model('Blog', blogSchema);
