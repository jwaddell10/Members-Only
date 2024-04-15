const mongoose = require("mongoose");
const Message = require("./models/message");
const User = require("./models/user");
require("dotenv").config();

const messages = [];
const users = [];

main().catch((err) => console.log(err));

async function main() {
	const mongoDB = process.env.MONGODB_KEY;
	const db = mongoose.connection;
	db.on("error", console.error.bind(console, "mongo connection error"));

	await mongoose.connect(mongoDB);
	console.log("Should be connected");

	await Promise.all([Message.deleteMany(), User.deleteMany()]);
	await createMessages();
	await createUsers();
}

async function messageCreate(index, title, date, messageText, user) {
	const newMessage = {
		title: title,
		date: date,
		messageText: messageText,
		user: user,
	};

	const message = new Message(newMessage);

	await message.save();
	messages[index] = message;
	console.log(messages[0], "this is messages array");
}

async function userCreate(index, username, password) {
	const newUser = {
		username: username,
		password: password,
	};

	const user = new User(newUser);

	await user.save();
	users[index] = user;
	console.log(users[0], "this is users array");
}

async function createMessages() {
	await Promise.all([
		messageCreate(
			0,
			"Message Title",
            new Date("2024-04-05"),
			"message from jonathan, hello!",
			users[0]
		),
		messageCreate(
			1,
			"Another Message Title",
            new Date("2024-04-06"),
			"another message from jonathan, hello world",
			users[1]
		),
	]);
}

async function createUsers() {
	await Promise.all([
		userCreate(
			0,
			"Anon",
			"1234password",
		),
		userCreate(
			1,
			"Anon",
			"anotherpassword",
		),
	]);
}
