const express = require("express");
const tokenMiddleware = require('../middleware/auth'); //middleware
const addEvent = require("../api/channelEvent/addEvent");
const deleteEvent = require("../api/channelEvent/deleteEvent");
const updateEvent = require("../api/channelEvent/updateEvent");
const searchEvent = require("../api/channelEvent/searchEvent");
const getChannelEvent = require("../api/channelEvent/getChannelEvent");

const router = express.Router();

router.get("/", tokenMiddleware, getChannelEvent);
router.post("/add", tokenMiddleware,  addEvent);
router.delete("/delete", tokenMiddleware, deleteEvent);
router.put("/update", tokenMiddleware, updateEvent);
router.get("/search", tokenMiddleware, searchEvent);

module.exports = router;