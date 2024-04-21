const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Message = require("../models/message");
const User = require("../models/user");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const messageController = require("../controllers/messageController");

router.get("/", async (req, res, next) => {
	try {
		const allMessages = await Message.find({}).populate("user").exec();
		console.log(allMessages, 'this is all')
		res.render("index", { user: req.user, messages: allMessages });
	} catch (error) {
		console.error("Error fetching messages:", error);
		res.status(500).send("Error fetching messages");
	}
});

router.get("/login", authController.loginGet);
router.post("/login", authController.loginPost);

router.get("/logout", authController.logout);

router.get("/signup", authController.signupGet);
router.post("/signup", authController.signupPost);

router.get("/profile", userController.profileGet);
router.post("/profile", userController.profilePost);

router.post("/message", messageController.messagePost);
router.post("/delete/:id", messageController.messageDelete);

module.exports = router;
