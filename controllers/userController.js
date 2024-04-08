const { body, validationResult } = require("express-validator");
const Message = require("../models/message");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

//sign-up form to create user

exports.user_create_get = asyncHandler(async (req, res, next) => {
<<<<<<< HEAD
    console.log('is this running?')
=======
>>>>>>> db305628f99b7723c36ec0d2aec0c7537138b336
	res.render("sign-up", {
		title: "Sign-Up Form",
	});
});

<<<<<<< HEAD
// exports.user_create_post = asyncHandler(async (req, res, next) => {
// 	//need values from the form, need to sanitize them
// 	// body("username") "password" "password"
// 	console.log(req.body, "this is reqbody");
// 	try {
// 		const user = new User({
// 			username: req.body.username,
// 			password: req.body.password,
// 		});
// 	} catch {
// 		console.log("this is caught");
// 	}
// });
=======
exports.user_create_post = asyncHandler(async (req, res, next) => {
	//need values from the form, need to sanitize them
	// body("username") "password" "password"
	console.log(req.body, "this is reqbody");
	try {
		const user = new User({
			username: req.body.username,
			password: req.body.password,
		});
	} catch {
		console.log("this is caught");
	}
});
>>>>>>> db305628f99b7723c36ec0d2aec0c7537138b336
