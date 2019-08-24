const express = require("express");
const showNotAllowed = require("../api/adminPage/showNotAllowed");
const allowUser = require("../api/adminPage/allowUser");
const tokenMiddleware = require('../middleware/auth'); //middleware

const router = express.Router();

router.get("/notallowed", tokenMiddleware, showNotAllowed);

router.get("/allowuser", tokenMiddleware, allowUser);

module.exports = router;