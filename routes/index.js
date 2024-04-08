var express = require("express");
var router = express.Router();
const user_controller = require('../controllers/userController')

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "ChatterZone" });
});

router.get('/sign-up', user_controller.user_create_get)

module.exports = router;
