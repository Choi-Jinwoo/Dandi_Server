const express = require("express");
const tokenMiddleware = require('../middleware/auth'); //middleware
const searchSchool = require("../api/school/searchSchool");
const searchClass = require("../api/school/searchClass");
const router = express.Router();

router.get("/searchschool", searchSchool);
router.get("/searchclass", searchClass);

module.exports = router;