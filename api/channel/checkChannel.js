const models = require("../../models/models");
const colorConsole = require("../../lib/console");

module.exports = async (req, res) => {
    colorConsole.green("[channel] 가입 채널 조회");
    const user = req.user;

    try {
        const joinedChannel = await models.ChannelUser.findAll({ where : { user_id : user.user_id } });
    
        if (!joinedChannel.length) {
            colorConsole.yellow("[channel] 가입 채널이 존재하지 않습니다.");
            return res.status(400).json({ status : 400, message : "가입 채널이 존재하지 않습니다." });
        }

        return res.status(200).json({ status : 200, message : "가입 채널 조회에 성공하였습니다.", data : { joinedChannel } });
    } catch(err) {
        colorConsole(err.message);
        return res.status(500).json({ status : 500, message : "가입 채널 조회에 실패하였습니다." });
    }
}