const express = require("express");
const tokenMiddleware = require('../middleware/auth'); //middleware
const getMyProfile = require("../api/profile/getMyProfile");
const router = express.Router();

router.get("/getmyprofile", tokenMiddleware, getMyProfile);

module.exports = router;