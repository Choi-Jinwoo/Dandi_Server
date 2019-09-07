const express = require("express");
const tokenMiddleware = require('../middleware/auth'); //middleware
const searchSchool = require("../api/school/schoolInfo");
const searchClass = require("../api/school/classInfo");
const schoolEvent = require("../api/school/schoolEvent");
const router = express.Router();

router.get("/search-school", searchSchool);
router.get("/search-class", searchClass);
router.get("/events", tokenMiddleware, schoolEvent);

module.exports = router;