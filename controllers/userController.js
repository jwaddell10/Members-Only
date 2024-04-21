const { body, validationResult } = require("express-validator");
const Message = require("../models/message");
const User = require("../models/user");
require("dotenv").config();
const asyncHandler = require("express-async-handler");

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
		const correctAdminPassword = process.env.admin_password;

		if (userEnteredClubPassword === correctClubPassword) {
			loggedInUser.status = true;
			await User.updateOne({ _id: loggedInUser._id }, { status: true });

			if (userEnteredAdminPassword === correctAdminPassword) {
				loggedInUser.admin = true;
				await User.updateOne(
					{ _id: loggedInUser._id },
					{ admin: true }
				);
			}
			return res.redirect("/");
		} else {
			if (userEnteredClubPassword !== correctClubPassword) {
				return res.render("profile", {
					title: "Profile",
					errorMessage: "Incorrect club password. Please try again.",
				});
			}

			return res.redirect("/");
		}
	} catch (error) {
		next(error);
	}
});
