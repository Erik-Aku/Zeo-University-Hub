const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedColleges` array in User.js
const collegeSchema = new Schema({
	collegeId: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	state: {
		type: String,
		required: true
	},
	size: {
		type: Number
	}
});

module.exports = collegeSchema;
