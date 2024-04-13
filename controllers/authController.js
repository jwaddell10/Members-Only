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
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			// If there are validation errors, render the login page with error messages
			res.render("login", {
				username: req.body.username,
				errors: errors.array(),
			});
			return;
		}

		passport.authenticate("local", (err, user, info) => {
            console.log(user, 'this is user')
			if (err) {
				return next(err);
			}
			if (!user) {
				// If authentication fails, redirect to the login page with a flash message
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
				// Successful login, redirect to a dashboard or home page
				return res.redirect("/login");
			});
		})(req, res, next);
	}),
];

exports.logout = (req, res, next) => {
    console.log('is this running?')
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  };

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
