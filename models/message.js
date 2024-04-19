const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
	// title: { type: String, required: [true, "Please enter a title"] },
	date: { type: Date, default: Date.now },
	messageText: { type: String, required: [true, "Please enter a message"] },
	user: { type: Schema.Types.ObjectId, ref: "User" },
});

messageSchema.virtual("url").get(function () {
	return `/index/message/${this._id}`
});

messageSchema.virtual("date_formatted").get(function() {
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
})

module.exports = mongoose.model("Message", messageSchema)