const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Message = require("../models/message");
const User = require("../models/user");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

/* GET home page. */
router.get("/", async (req, res, next) => {
	console.log(req.user, "this is requser");
	const allMessages = await Message.find({})
		.populate("user")
		.exec();
	const allUsers = await User.find({}).exec();

	console.log(allUsers, "this is allUsers");
	console.log(allMessages, "this is messages in indexget");
	res.render("index", { user: req.user, messages: allMessages });
});

router.get("/login", authController.loginGet);
router.post("/login", authController.loginPost);

router.get("/logout", authController.logout);

router.get("/signup", authController.signupGet);
router.post("/signup", authController.signupPost);

router.get("/profile", userController.profileGet);
router.post("/profile", userController.profilePost);

module.exports = router;
