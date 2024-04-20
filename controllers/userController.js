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
		const userEnteredClubPassword = req.body.clubpassword;
		const userEnteredAdminPassword = req.body.adminpassword;
		const correctClubPassword = process.env.club_password;
		const correctAdminPassowrd = process.env.admin_password;

		if (userEnteredClubPassword === correctClubPassword) {
			loggedInUser.status = true;
			await User.updateOne({ _id: loggedInUser._id }, { status: true });
			if (userEnteredAdminPassword === correctAdminPassowrd) {
				loggedInUser.admin = true;
				await User.updateOne(
					{ _id: loggedInUser._id },
					{ admin: true }
				);
			}
			return res.redirect("/");
		}

		res.render("profile", {
			title: "Profile",
			errorMessage: "Incorrect club password. Please try again.",
		});
	} catch (error) {
		next(error);
	}
});

//second profile?
//add another signup page, secret password = social worker, the other is members only
