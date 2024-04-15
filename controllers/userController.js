const { body, validationResult } = require("express-validator");
const Message = require("../models/message");
const User = require("../models/user");
require("dotenv").config();
const asyncHandler = require("express-async-handler");

//sign-up form to create user

exports.profileGet = asyncHandler(async (req, res, next) => {
	res.render("profile", {
		title: "Profile",
	});
});

exports.profilePost = asyncHandler(async (req, res, next) => {
	try {
		const loggedInUser = req.user;
		const userEnteredPassword = req.body.clubpassword;
		const correctClubPassword = process.env.club_password;

		if (userEnteredPassword === correctClubPassword) {
			loggedInUser.status = true;
			await User.updateOne({ _id: loggedInUser._id }, { status: true });
			return res.redirect("/");
		}

		res.render("profile", {
			title: "Profile",
			errorMessage: "Incorrect club password. Please try again."
		});
	} catch (error) {
		next(error);
	}
});

