const tokenMiddleware = require('../../middleware/auth'); //middleware
const channelAdminCtrl = require('./channelAdmin.ctrl');
const router = require('express').Router();

router.get('/', tokenMiddleware, channelAdminCtrl.createChannel);
router.get('/await', tokenMiddleware, channelAdminCtrl.awaitUser);
router.get('/allow', tokenMiddleware, channelAdminCtrl.allowUser);
router.delete('/reject', tokenMiddleware, channelAdminCtrl.rejectUser);
router.put('/update', tokenMiddleware, channelAdminCtrl.updateChannel);
router.delete('/forced-exit', tokenMiddleware, channelAdminCtrl.forcedExit);

module.exports = router;