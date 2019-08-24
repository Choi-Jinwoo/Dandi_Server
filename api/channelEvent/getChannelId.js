const ChannelEvent = require("../../models/models").ChannelEvent;

module.exports = async function(event_id) {
    try {
        const findChannel = await ChannelEvent.findOne({
            where : { id : event_id }
        })

        if (findChannel === null || findChannel === undefined) {
            throw "일정이 존재하지 않습니다"
        }
        
        return findChannel.channel_id;
    } catch(err) {
        throw err;
    }
}