const tokenMiddleware = require('../../middleware/auth'); //middleware
const imageCtrl = require('./profile.ctrl');
const router = require('express').Router();

router.get('/', tokenMiddleware, imageCtrl.getProfile);

module.exports = router;