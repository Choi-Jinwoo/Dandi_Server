const express = require("express");
const tokenMiddleware = require('../middleware/auth'); //middleware
const addChannel = require("../api/channel/addChannel");
const searchChannel = require("../api/channel/searchChannel");
const joinChannel = require("../api/channel/joinChannel");
const deleteChannel = require("../api/channel/deleteChannel");
const leaveChannel = require("../api/channel/leaveChannel");
const checkChannel = require("../api/channel/checkChannel");
const router = express.Router();

router.post("/add",tokenMiddleware, addChannel);
router.get("/search", tokenMiddleware, searchChannel);
router.get("/join", tokenMiddleware, joinChannel);
router.delete("/delete", tokenMiddleware, deleteChannel);
router.delete("/leave", tokenMiddleware, leaveChannel);
router.get("/", tokenMiddleware, checkChannel);

module.exports = router;