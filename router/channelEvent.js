const express = require("express");
const tokenMiddleware = require('../middleware/auth'); //middleware
const addEvent = require("../api/channelEvent/addEvent");
const deleteEvent = require("../api/channelEvent/deleteEvent");
const updateEvent = require("../api/channelEvent/updateEvent");
const router = express.Router();

router.post("/addevent", tokenMiddleware,  addEvent);
router.delete("/deleteevent", tokenMiddleware, deleteEvent);
router.put("/updateevent", tokenMiddleware, updateEvent);
module.exports = router;