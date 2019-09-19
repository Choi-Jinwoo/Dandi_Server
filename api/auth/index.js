const tokenMiddleware = require('../../middleware/auth'); //middleware
const authCtrl = require('./auth.ctrl');
const router = require('express').Router();

router.post('/login',  authCtrl.login);
router.post('/sign-up', authCtrl.signUp);
router.post('/sign-up/is-overlapped', authCtrl.isOverlapped);
router.post('/sign-up/email', authCtrl.sendEmail);

module.exports = router;