const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
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

		const errors = validationResult(errors);

		if (!errors.isEmpty()) {
			res.render("login", {
				title: "Login",
			});
		} else {
			passport.use(
				new LocalStrategy(async (username, password, done) => {
					try {
						const user = await User.findOne({ username: username });
						if (!user) {
							return done(null, false, {
								message: "Incorrect username",
							});
						}
						const match = await bcrypt.compare(
							password,
							user.password
						);
						if (!match) {
							// passwords do not match!
							return done(null, false, {
								message: "Incorrect password",
							});
						}

						passport.authenticate("local", {
							successRedirect: "/",
							failureRedirect: "/",
						});
						return done(null, user);
					} catch (err) {
						return done(err);
					}
				})
			);
		}
	}),
];

exports.signupGet = asyncHandler(async (req, res, next) => {
	res.render("signup", {
		title: "Sign-Up Form",
	});
});

exports.signupPost = [
	asyncHandler(async (req, res, next) => {
		console.log(req.body, "this is reqbody");
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
