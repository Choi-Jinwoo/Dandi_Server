const express = require("express");
const tokenMiddleware = require('../middleware/auth'); //middleware
const myChannel = require("../api/channelAdmin/myChannel");
const awaitUser = require("../api/channelAdmin/awaitUser");
const acceptUser = require("../api/channelAdmin/acceptuser");
const rejectUser = require("../api/channelAdmin/rejectUser");
const router = express.Router();

router.get("/mychannel", tokenMiddleware, myChannel);
router.get("/awaituser", tokenMiddleware, awaitUser);
router.get("/acceptuser", tokenMiddleware, acceptUser);
router.delete("/rejectuser", tokenMiddleware, rejectUser);
module.exports = router;