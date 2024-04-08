const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	userName: {
		type: String, required: [true, "Please enter a username"]
	},
	password: {
		type: String,
		required: [true, "Please enter a valid password"],
	},
	status: { type: Boolean, required: [true, "Are you a member or no?"] },
});

module.exports = mongoose.model("User", userSchema);