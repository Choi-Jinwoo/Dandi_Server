const express = require("express");
const tokenMiddleware = require('../middleware/auth'); //middleware
const uploadProfile = require("../api/image/uploadProfile");
const upload = require("../api/image/configMulter");
const router = express.Router();

router.post("/upload", tokenMiddleware, upload.single("profile_pic"), uploadProfile);

module.exports = router;