const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

router.post("/signup", signup); // User only
router.post("/login", login); // Admin & User

module.exports = router;
