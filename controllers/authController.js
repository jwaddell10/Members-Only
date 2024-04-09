const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const Message = require("../models/message");
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
		passport.use(
			new LocalStrategy(async (username, password, done) => {
				try {
					const user = await User.findOne({ username: username });
					if (!user) {
						return done(null, false, {
							message: "Incorrect username",
						});
					}
					const match = await bcrypt.compare(password, user.password);
					if (!match) {
						// passwords do not match!
						return done(null, false, {
							message: "Incorrect password",
						});
					}
					return done(null, user);
				} catch (err) {
					return done(err);
				}
			})
		);

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

	asyncHandler(async (req, res, next) => {
		try {
			bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
				if (!err.isEmpty()) {
					throw new Error("User could not be created");
				}
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
