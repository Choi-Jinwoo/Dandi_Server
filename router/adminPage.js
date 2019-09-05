const express = require("express");
const tokenMiddleware = require('../middleware/auth'); //middleware
const awaituser = require("../api/adminPage/awaitUser");
const allowUser = require("../api/adminPage/allowUser");
const rejcetUser = require("../api/adminPage/rejectUser");

const router = express.Router();

router.get("/", tokenMiddleware, awaituser);
router.get("/allow", tokenMiddleware, allowUser);
router.delete("/reject", tokenMiddleware, rejcetUser);

module.exports = router;