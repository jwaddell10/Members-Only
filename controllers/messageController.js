const { body, validationResult } = require("express-validator");
const Message = require("../models/message");
const User = require("../models/user");
const { DateTime } = require("luxon");
require("dotenv").config();
const asyncHandler = require("express-async-handler");

exports.messagePost = [
	// Validate request body
	body("title").notEmpty().withMessage("Title is required"),
	body("messageText").notEmpty().withMessage("Message is required"),

	asyncHandler(async (req, res, next) => {
		try {
			// If validation fails, return validation errors
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			// Assuming message.date_formatted is a valid date string
			const formattedDate = new Date().toISOString(); // Change this to your actual date formatting logic

			// Create a new Message object
			const createdMessage = new Message({
				title: req.body.title,
				messageText: req.body.messageText,
                date: formattedDate, // Using formatted date
			});

			// Save the message to the database
			await createdMessage.save();
            res.redirect("/")
			// If the message is saved successfully, send a response
		} catch (error) {
			// If an error occurs, send an error response
			console.error("Error saving message:", error);
			res.status(500).json({ error: "Internal server error" });
		}
	}),
];
