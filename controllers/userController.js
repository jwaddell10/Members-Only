const { body, validationResult } = require("express-validator");
const Message = require("../models/message");
const User = require("../models/user");
require("dotenv").config();
const asyncHandler = require("express-async-handler");

//sign-up form to create user

exports.profileGet = asyncHandler(async (req, res, next) => {
	//
	res.render("profile", {
		title: "Profile",
	});
});

exports.profilePost = asyncHandler(async (req, res, next) => {
	//take form data, check if it matches, if so change user status to true, indicating a member. redirect to index
	console.log(req.body, "this is req");
	console.log(req.user, "this is user in profile");
	const currentUser = req.user;
	const clubPassword = process.env.club_password;
	const enteredPassword = req.body.clubpassword;

	if (enteredPassword === clubPassword) {
		console.log(currentUser, "this is user");
		currentUser.status = true;
		await User.updateOne({ _id: currentUser._id }, { status: true });
		
		res.redirect("/");
	} else {
		res.render("profile", {
			title: "Profile",
			errorMessage: "Incorrect club password. Please try again."
		});
	}
});
