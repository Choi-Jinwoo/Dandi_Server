const models = require("../../models");

module.exports = async (userId, channelId) => {
    try {
        const isMember = await models.ChannelUser.findOne({ where : { user_id : userId, channel_id : channelId, isAllowed : true } });
        if (!isMember) {
            return false;
        }
        
        return true;
    } catch(err) {
        throw err;
    }
}