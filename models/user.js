const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstName: {
		type: String,
		required: [true, "Please enter your first name"],
	},
	lastName: { type: String, required: [true, "Please enter your last name"] },
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: function (value) {
				return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
			},
			message: "Invalid email address format",
		},
	},
	password: {
		type: String,
		required: [true, "Please enter a valid password"],
	},
	status: { type: Boolean, required: [true, "Are you a member or no?"] },
});

module.exports = mongoose.model("User", userSchema);