const models = require("../../models");
const colorConsole = require("../../lib/console");

module.exports = async (req, res) => {
    colorConsole.green("[channel] 채널 탈퇴");
    const user = req.user;
    const { channel_id } = req.query; //querystring (channel_id : leave channel id)
    
    colorConsole.gray("request");
    colorConsole.gray({ channel_id });

    if (!channel_id) {
        colorConsole.yellow("검증 오류입니다.");
        return res.status(400).json({ status : 400, message : "검증 오류입니다" });
    }

    try {
        const deleteUser = await models.ChannelUser.destroy({ where : { user_id : user.user_id, channel_id } });
        const channel = await models.Channel.findOne({ where : { id : channel_id } });

        if (!deleteUser) {
            colorConsole.yellow("[channel] 가입정보가 존재하지 않습니다.");
            return res.status(400).json({ status : 400, message : "가입정보가 존재하지 않습니다." });
        }
        if (channel.create_user === user.user_id) {
            colorConsole.yellow("[channel] 탈퇴가 불가능한 유저입니다.");
            return res.status(400).json( {status : 400, message : "탈퇴가 불가능한 유저입니다." });
        }

        return res.status(200).json({ status : 200, message : "채널 탈퇴에 성공하였습니다." });
    } catch(err) {
        colorConsole.red(err.message);
        return res.status(500).json({ status : 500, message : "채널 탈퇴에 실패하였습니다" });
    }
}