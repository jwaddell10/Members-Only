const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController')

router.get('/sign-up', user_controller.user_create_get)

<<<<<<< HEAD
// router.post('/sign-up', user_controller.user_create_post)
=======
router.post('/sign-up', user_controller.user_create_post)
>>>>>>> db305628f99b7723c36ec0d2aec0c7537138b336

module.exports = router;