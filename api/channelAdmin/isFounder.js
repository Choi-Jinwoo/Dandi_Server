const models = require("../../models/models");

module.exports = async (user_id, channel_id) => {
    try {
        const createdChannel = await models.Channel.findOne({ where : { id : channel_id, create_user : user_id } });
       
        if (!createdChannel) {
            return false;
        }

        return true;
    } catch(err) {
        throw err;
    }
}