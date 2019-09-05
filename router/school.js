const express = require("express");
const tokenMiddleware = require('../middleware/auth'); //middleware
const searchSchool = require("../api/school/searchSchool");
const searchClass = require("../api/school/searchClass");
const schoolEvent = require("../api/school/schoolEvent");
const router = express.Router();

router.get("/search-school", searchSchool);
router.get("/search-class", searchClass);
router.get("/school-event", tokenMiddleware, schoolEvent);

module.exports = router;