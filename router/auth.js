const express = require("express");
const login = require("../api/auth/login");
const signup = require("../api/auth/signup");
const tokenMiddleware = require('../middleware/auth'); //middleware
const isOverlapped = require("../api/auth/isOverlapped");
const sendEmail = require("../api/auth/sendEmail");
const router = express.Router();

router.post("/login",  login);
router.post("/signup", signup);
router.post("/signup/isoverlapped", isOverlapped);
router.post("/signup/sendemail", sendEmail);

module.exports = router;