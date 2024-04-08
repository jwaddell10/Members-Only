const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "ChatterZone" });
});

router.get('/login', authController.loginGet)
router.post('/login', authController.loginPost)

router.get('/signup', authController.signupGet)
router.post('/signup', authController.signupPost)

module.exports = router;
