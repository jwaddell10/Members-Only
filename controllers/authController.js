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

exports.loginPost = [
	//sanitize and check data, see if user exists,
	body("username").trim().isLength({ min: 1 }).escape(),
	body("password").trim().isLength({ min: 1 }).escape(),

	asyncHandler(async (req, res, next) => {
		console.log(req.body, "this is req body");
		console.log(res, "this is res locals");
		//find one user who's

		passport.authenticate("local", {
			successRedirect: "/",
			failureRedirect: "/",
		});
	}),
];

exports.signupGet = asyncHandler(async (req, res, next) => {
	res.render("signup", {
		title: "Sign-Up Form",
	});
});

exports.signupPost = [
	asyncHandler(async (req, res, next) => {
		const duplicate = await User.findOne({ username: req.body.username });
		if (duplicate !== null) {
			res.render("signup", {
				title: "Sign-Up Form",
			});
		}
		next();
	}),

	body("username").trim().isLength({ min: 1 }).escape(),
	body("password").trim().isLength({ min: 1 }).escape(),
	body("passwordConfirmation")
		.trim()
		.isLength({ min: 1 })
		.custom((value) => {
			if (value !== req.body.password) {
				throw new Error("Passwords do not match");
			}
		})
		.escape(),

	//check if username exists, encrypt password
	asyncHandler(async (req, res, next) => {
		try {
			bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
				const user = new User({
					username: req.body.username,
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
