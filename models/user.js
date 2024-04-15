const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: [true, "Please enter a username"],
	},
	password: {
		type: String,
		required: [true, "Please enter a valid password"],
	},
	status: {
		type: Boolean,
		default: false,
		required: true	
	},
	admin: {
		type: Boolean,
		default: false,
	}
});

module.exports = mongoose.model("User", userSchema);
