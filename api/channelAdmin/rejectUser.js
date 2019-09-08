const models = require("../../models/models");
const colorConsole = require("../../lib/console");
const isFounder = require("./isFounder");

module.exports = async (req, res) => {
    colorConsole("[channelAdmin] 승인대기 유저 거절");
    const user = req.user;
    const { channel_id, user_id } = req.query; //querystring (channel_id : request channel, user_id : reject user id)
    
    colorConsole.gray("request");
    colorConsole.gray({ channel_id, user_id });

    if (!(channel_id && user_id)) {
        colorConsole.yellow("검증 오류입니다.");
        return res.status(400).json({ status : 400, message : "검증 오류입니다" });
    }

    try {
        if (!await isFounder(user.user_id, channel_id)) {
            colorConsole.yellow("[channelAdmin] 거절 권한이 없습니다.");
            return res.status(403).json({ status : 403, message : "거절 권한이 없습니다." });
        }
        
        const channelUserInfo = await models.ChannelUser.findOne({ where : { user_id, channel_id } });
        
        if (!channelUserInfo) {
            colorConsole.yellow("[channelAdmin] 가입신청이 존재하지 않습니다.");
            return res.status(400).json({ status : 400, message : "가입신청이 존재하지 않습니다." });
        }
        if (channelUserInfo.isAllowed) {
            colorConsole.yellow("[channelAdmin] 이미 승인된 유저입니다.");
            return res.status(400).json({ status : "이미 승인된 유저입니다." });
        }

        await ChannelUser.destroy({ where : { user_id, channel_id } });

        return res.status(200).json({status : 200, message : "채널 거절이 완료되었습니다."});
    } catch(err) {
        colorConsole.red(err.message);
        return res.status(500).json({ status : 500, message : "채널 거절에 실패하였습니다."});
    }
}