const express = require("express");
const tokenMiddleware = require('../middleware/auth'); //middleware
const showNotAllowed = require("../api/adminPage/showNotAllowed");
const allowUser = require("../api/adminPage/allowUser");
const rejcetUser = require("../api/adminPage/rejectUser");

const router = express.Router();

router.get("/notallowed", tokenMiddleware, showNotAllowed);
router.get("/allowuser", tokenMiddleware, allowUser);
router.delete("/rejectuser", tokenMiddleware, rejcetUser);

module.exports = router;