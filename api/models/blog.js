const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	content: String,
	Author: String
});

module.exports = mongoose.model('Blog', blogSchema);
