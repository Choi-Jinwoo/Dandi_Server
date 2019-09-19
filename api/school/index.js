const tokenMiddleware = require('../../middleware/auth'); //middleware
const schoolCtrl = require('./school.ctrl');
const router = require('express').Router();

router.get('/search-school', schoolCtrl.searchByName);
router.get('/search-class', schoolCtrl.classInfo);
router.get('/events', tokenMiddleware, schoolCtrl.schoolEvent);

module.exports = router;