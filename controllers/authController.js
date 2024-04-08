const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const Message = require("../models/message");
const User = require("../models/user");

exports.loginGet = asyncHandler(async (req, res, next) => {
	res.render("login", {
		title: "Login",
	});
});

exports.loginPost = [];

exports.signupGet = asyncHandler(async (req, res, next) => {
	res.render("signup", {
		title: "Sign-Up Form",
	});
});

exports.signupPost = [
	body("username").trim().isLength({ min: 1 }).escape(),
	body("password").trim().isLength({ min: 1 }).escape(),
	body("passwordConfirmation").trim().isLength({ min: 1 }).escape(),

	//check if username exists, encrypt password
	asyncHandler(async (req, res, next) => {
		console.log("is this running? post");

		try {
			bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
				const user = new User({
					userName: req.body.username,
					password: hashedPassword,
				});

				const result = await user.save();

				console.log(result, "this is result");
				res.redirect("/");
			});
		} catch (err) {
			return next(err);
		}
	}),
];
