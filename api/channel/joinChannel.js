const models = require("../../models/models");
const colorConsole = require("../../lib/console");

module.exports = async (req, res) => {
    colorConsole.green("[channel] 채널 가입");
    const user = req.user;
    const { channel_id } = req.query; //querystring (channel_id : join channel id)
    
    colorConsole.gray("request");
    colorConsole.gray({ channel_id });

    if (!channel_id) {
        colorConsole.yellow("검증 오류입니다.");
        return res.status(400).json({ status : 400, message : "검증 오류입니다" });
    }

    try{
        const channelUser = await models.ChannelUser.findOne({ where : { user_id : user.user_id, channel_id } });
        if (channelUser) {
            colorConsole.yellow("[channel] 이미 가입된 채널입니다.");
            return res.status(400).json({ status : 400, message : "이미 가입된 채널입니다." });
        }
      
        const channel = await models.Channel.findOne({ where : { id : channel_id } });
        const channelPublic = channel.isPublic;
        
        await models.ChannelUser.create({
            user_id : user.user_id,
            channel_id,
            isAllowed : channelPublic,
            pushNotify: false,
        });

        return res.status(200).json({ status : 200, message : "채널 가입에 성공하였습니다." });
    } catch(err) {
        colorConsole.red(err.message);
        return res.status(500).json({ status : 500, message : "채널 가입에 실패하였습니다." });
    }
}