const express = require("express");
const tokenMiddleware = require('../middleware/auth'); //middleware
const saveFileName = require("../api/image/saveFileName");
const upload = require("../api/image/configMulter");
const sendProfile = require("../api/image/sendProfileUrl");
const router = express.Router();

router.post("/uploadprofile", tokenMiddleware, upload.single("profile_pic"), saveFileName); //프로필 사진을 profile_pic으로 가져옴
router.get("/profileurl", tokenMiddleware, sendProfile);

module.exports = router;