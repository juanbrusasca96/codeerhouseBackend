const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	address: { type: String, required: true },
	age: { type: Number, required: true },
	phoneNumber: { type: Number, required: true }
});

module.exports = mongoose.model('users', userSchema);