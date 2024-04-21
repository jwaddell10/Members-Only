const { body, validationResult } = require("express-validator");
const Message = require("../models/message");
const User = require("../models/user");
const { DateTime } = require("luxon");
require("dotenv").config();
const asyncHandler = require("express-async-handler");

exports.messagePost = [
	body("messageText").notEmpty().withMessage("Message is required"),

	asyncHandler(async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const formattedDate = new Date().toISOString();
			const user = await User.findById(req.user._id);

			const createdMessage = new Message({
				messageText: req.body.messageText,
				date: formattedDate,
				user: user,
			});

			await createdMessage.save();
			res.redirect("/");
		} catch (error) {
			res.status(500).json({ error: "Internal server error" });
		}
	}),
];

exports.messageDelete = asyncHandler(async (req, res, next) => {
	try {
		const messageId = req.params.id;
		const messageToDelete = await Message.findByIdAndDelete(messageId);
		res.redirect("/");
	} catch (error) {
		throw new Error("message was not deleted");
	}
});
