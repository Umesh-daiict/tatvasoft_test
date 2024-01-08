const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	Firstname: String,
	Lastname: String,
	Email: String,
	Phone: String,
	Status: Boolean,
});

module.exports = mongoose.model('user', userSchema);
