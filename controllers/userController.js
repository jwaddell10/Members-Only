const { body, validationResult } = require("express-validator");
const Message = require("../models/message");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

//sign-up form to create user

exports.user_create_get = asyncHandler(async(req, res, next) => {
    res.render("sign-up", {
        title: "User form"
    })
})

exports.user_create_post = asyncHandler(async(req, res, next) => {
    
})