const express = require("express");
const tokenMiddleware = require('../middleware/auth'); //middleware
const addChannel = require("../api/channel/addChannel");
const searchChannel = require("../api/channel/searchChannel");
const joinChannel = require("../api/channel/joinChannel");
const deleteChannel = require("../api/channel/deleteChannel");
const leaveChannel = require("../api/channel/leaveChannel");
const checkChannel = require("../api/channel/checkChannel");
const channelInfo = require("../api/channel/channeInfo");
const router = express.Router();

router.get("/", tokenMiddleware, checkChannel);
router.post("/add",tokenMiddleware, addChannel);
router.get("/search", tokenMiddleware, searchChannel);
router.get("/join", tokenMiddleware, joinChannel);
router.delete("/delete", tokenMiddleware, deleteChannel);
router.delete("/leave", tokenMiddleware, leaveChannel);
router.get("/info", tokenMiddleware, channelInfo);

module.exports = router;