const models = require("../../models/models");

module.exports = async (eventId) => {
    try {
        const channel = await models.ChannelEvent.findOne({ where : { id : eventId} })
        if (!channel) {
            throw {
                status : 404,
                message : "일정이 존재하지 않습니다."
            }
        }
        
        return channel.channel_id;
    } catch(err) {
        throw err;
    }
}