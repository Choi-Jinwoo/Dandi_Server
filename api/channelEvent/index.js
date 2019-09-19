const tokenMiddleware = require('../../middleware/auth'); //middleware
const channelEvent = require('./channelEvent.ctrl');
const router = require('express').Router();

router.get('/', tokenMiddleware, channelEvent.getChannelEvent);
router.post('/add', tokenMiddleware,  channelEvent.addEvent);
router.delete('/delete', tokenMiddleware, channelEvent.deleteEvent);
router.put('/update', tokenMiddleware, channelEvent.updateEvent);
router.get('/search', tokenMiddleware, channelEvent.searchEvent);

module.exports = router;