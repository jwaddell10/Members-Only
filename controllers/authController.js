const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const User = require("../models/user");

exports.loginGet = asyncHandler(async (req, res, next) => {
	res.render("login", {
		title: "Login",
		user: req.user,
	});
});

exports.loginPost = [
	body("username").trim().isLength({ min: 1 }).escape(),
	body("password").trim().isLength({ min: 1 }).escape(),

	asyncHandler(async (req, res, next) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				res.render("login", {
					username: req.body.username,
					errors: errors.array(),
				});
				return;
			}

			passport.authenticate("local", (err, user, info) => {
				if (err) {
					return next(err);
				}
				if (!user) {
					return res.render("login", {
						title: "Login",
						user: req.user,
						failureMessage: info.message,
					});
				}

				req.login(user, (err) => {
					if (err) {
						return next(err);
					}
					return res.redirect("/");
				});
			})(req, res, next);
		} catch (error) {
			next(error);
		}
	}),
];

exports.logout = (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
};

exports.signupGet = asyncHandler(async (req, res, next) => {
	res.render("signup", {
		title: "Sign-Up Form",
	});
});

exports.signupPost = [
	asyncHandler(async (req, res, next) => {
		try {
			const duplicate = await User.findOne({
				username: req.body.username,
			});
			if (duplicate !== null) {
				res.render("signup", {
					title: "Sign-Up Form",
					errorMessage: "User already exists",
				});
			} else {
				next();
			}
		} catch (error) {
			next(error);
		}
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

	asyncHandler(async (req, res, next) => {
		try {
			bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
				if (err) {
					throw new Error("User could not be created");
				}
				const user = new User({
					username: req.body.username,
					password: hashedPassword,
				});

				await user.save();
				res.redirect("/");
			});
		} catch (err) {
			return next(err);
		}
	}),
];
