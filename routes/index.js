const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

/* GET home page. */
router.get("/", function (req, res, next) {
	console.log(req.user, 'this is requser')
	res.render("index", { user: req.user, title: "ChatterZone" });
});

router.get('/login', authController.loginGet)
router.post('/login', authController.loginPost)

router.get('/logout', authController.logout)

router.get('/signup', authController.signupGet)
router.post('/signup', authController.signupPost)

router.get('/profile', userController.profileGet)
router.post('/profile', userController.profilePost)

module.exports = router;
