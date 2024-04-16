const { body, validationResult } = require("express-validator");
const Message = require("../models/message");
const User = require("../models/user");
require("dotenv").config();
const asyncHandler = require("express-async-handler");

exports.messagePost = asyncHandler(async (req, res, next) => {
    console.log(req, 'this is req')
    console.log(req.body, 'this is reqbodymessage')
    console.log(req.user, 'this is req user')
    const newMessage = req.body.message
    //take input data from form
    //add it to message database
    //render it to page
});
