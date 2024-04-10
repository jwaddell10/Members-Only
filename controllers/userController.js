const { body, validationResult } = require("express-validator");
const Message = require("../models/message");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

//sign-up form to create user
