const express = require("express");
const tokenMiddleware = require('../middleware/auth'); //middleware
const addEvent = require("../api/channelEvent/addEvent");
const deleteEvent = require("../api/channelEvent/deleteEvent");

const router = express.Router();

router.post("/addevent", tokenMiddleware,  addEvent);
router.delete("/deleteevent", tokenMiddleware, deleteEvent);

module.exports = router;