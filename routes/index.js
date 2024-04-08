var express = require("express");
var router = express.Router();

const user_controller = require("../controllers/userController");
/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

module.exports = router;
