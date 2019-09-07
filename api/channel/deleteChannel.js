const models = require("../../models/models");
const colorConsole = require("../../lib/console");

module.exports = async (req, res) => {
    colorConsole.green("[channel] 채널 삭제");
    const user = req.user;
    const { channel_id } = req.query; //querystring (channel_id : delete channel id)
    
    if (!channel_id) {
        colorConsole.gray("검증 오류입니다.");
        return res.status(400).json({ status : 400, message : "검증 오류입니다." });
    }

    try {
        const channel = await models.Channel.findOne({ where : { id : channel_id } });
        
        if (!channel) {
            colorConsole.yellow("[channel] 채널 정보가 존재하지 않습니다.");
            return res.status(400).json({ status : 400, message : "채널 정보가 존재하지 않습니다." });
        }
        
        if (channel.create_user !== user.user_id) {
            colorConsole.yellow("[channel] 삭제 권한이 없습니다.");
            return res.status(403).json({ status : 403, message : "삭제 권한이 없습니다."});
        }
   
        await models.ChannelUser.destroy({ where : { channel_id } });
        await models.Channel.destroy({ where : { id : channel_id } });

        return res.status(200).json({ status : 200, message : "채널 삭제에 성공하였습니다." });
    } catch (err) {
        colorConsole.gray(err.message);
        return res.status(500).json({ status : 500, message : "채널 삭제에 실패하였습니다." });
    }
}

