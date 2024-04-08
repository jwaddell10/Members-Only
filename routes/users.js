const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController')

router.get('/sign-up', user_controller.user_create_get)

router.post('/sign-up', user_controller.user_create_post)

module.exports = router;