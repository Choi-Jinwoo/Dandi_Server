const tokenMiddleware = require('../../middleware/auth'); //middleware
const imageCtrl = require('./image.ctrl');
const router = require('express').Router();

router.post('/upload/profile', tokenMiddleware, imageCtrl.uploadProfile);
router.post('/upload/thumbnail', tokenMiddleware, imageCtrl.uploadThumbnail);

module.exports = router;