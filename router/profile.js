const express = require("express");
const tokenMiddleware = require('../middleware/auth'); //middleware
const getProfile = require("../api/profile/getProfile");
const router = express.Router();

router.get("/", tokenMiddleware, getProfile);

module.exports = router;