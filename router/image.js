const express = require("express");
const tokenMiddleware = require('../middleware/auth'); //middleware
const uploadProfile = require("../api/image/uploadProfile");
const uploadThumbnail = require("../api/image/uploadThumbnail");
const upload = require("../api/image/configMulter");
const router = express.Router();

router.post("/upload/profile", tokenMiddleware, upload.single("profile_pic"), uploadProfile);
router.post("/upload/thumbnail", tokenMiddleware, upload.single("thumbnail"), uploadThumbnail);
module.exports = router;