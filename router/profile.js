const express = require("express");
const tokenMiddleware = require('../middleware/auth'); //middleware
const getMyProfile = require("../api/profile/getMyProfile");
const getOtherProfile = require("../api/profile/getOtherProfile");
const router = express.Router();

router.get("/getmyprofile", tokenMiddleware, getMyProfile);
router.get("/getotherprofile", tokenMiddleware, getOtherProfile);

module.exports = router;