const express = require("express");
const tokenMiddleware = require('../middleware/auth'); //middleware
const addChannel = require("../api/channel/addChannel");
const searchChannel = require("../api/channel/searchChannel");
const joinChannel = require("../api/channel/joinChannel");
const deleteChannel = require("../api/channel/deleteChannel");
const leaveChannel = require("../api/channel/leaveChannel");
const joinedChannel = require("../api/channel/joinedChannel");
const router = express.Router();

router.post("/addchannel",tokenMiddleware, addChannel);
router.get("/searchchannel", tokenMiddleware, searchChannel);
router.get("/joinchannel", tokenMiddleware, joinChannel);
router.delete("/deletechannel", tokenMiddleware, deleteChannel);
router.delete("/leavechannel", tokenMiddleware, leaveChannel);
router.get("/joinedchannel", tokenMiddleware, joinedChannel);

module.exports = router;