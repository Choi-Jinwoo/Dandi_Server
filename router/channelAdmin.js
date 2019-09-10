const express = require("express");
const tokenMiddleware = require('../middleware/auth'); //middleware
const createChannel = require("../api/channelAdmin/createChannel");
const awaitUser = require("../api/channelAdmin/awaitUser");
const allowuser = require("../api/channelAdmin/allowUser");
const rejectUser = require("../api/channelAdmin/rejectUser");
const updateChannel = require("../api/channelAdmin/updateChannel");
const router = express.Router();

router.get("/", tokenMiddleware, createChannel);
router.get("/await-user", tokenMiddleware, awaitUser);
router.get("/allow", tokenMiddleware, allowuser);
router.delete("/reject", tokenMiddleware, rejectUser);
router.put("/update", tokenMiddleware, updateChannel);
module.exports = router;