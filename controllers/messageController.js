const { body, validationResult } = require("express-validator");
const Message = require("../models/message");
const User = require("../models/user");
const { DateTime } = require("luxon");
require("dotenv").config();
const asyncHandler = require("express-async-handler");

exports.messagePost = [
	body("title").notEmpty().withMessage("Title is required"),
	body("messageText").notEmpty().withMessage("Message is required"),

	asyncHandler(async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const formattedDate = new Date().toISOString();

			const createdMessage = new Message({
				title: req.body.title,
				messageText: req.body.messageText,
                date: formattedDate,
			});

			await createdMessage.save();
            res.redirect("/")
		} catch (error) {
			console.error("Error saving message:", error);
			res.status(500).json({ error: "Internal server error" });
		}
	}),
];

exports.messageDelete = asyncHandler(async(req, res, next) => {
	const messageToDelete = await Message({})
	console.log(messageToDelete, 'this is message to delete')
	console.log(req.user, 'this is user')
	console.log(req.message, 'this is message')
	//there's a requser
})
