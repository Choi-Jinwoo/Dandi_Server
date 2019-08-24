const ChannelUser = require("../../models/models").ChannelUser;

module.exports = async function (user_id, req_channel_id) {
    try {
        const result = await ChannelUser.findOne({ //자신이 속해있는가
            where : { user_id : user_id, channel_id : req_channel_id, isAllowed : true }
        }) 

        if (result === null || undefined) {
            return false;
        }

        return true;
    } catch(err) {
        throw err;
    }
}