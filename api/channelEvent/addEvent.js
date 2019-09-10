const models = require("../../models/models");
const colorConsole = require("../../lib/console");
const isMember = require("../channelEvent/isMember");
const Validation = require("../../lib/validation");

module.exports = async (req, res) => {
    colorConsole.green("[channelEvent] 일정 추가");
    const user = req.user;
    const { channel_id } = req.query; //querystring(channel_id : event channel_id)
    const { body } = req;
    body.author = user.user_id;

    colorConsole.gray("request");
    colorConsole.gray({ channel_id, body });

    try {
        if (!channel_id) {
            throw err;
        }
        await Validation.validateAddEvent(body);
    } catch(err) {
        colorConsole.yellow("검증 오류입니다.");
        return res.status(400).json({ status : 400, message : "검증 오류입니다." });
    }

    try {
        if (!await isMember(user.user_id, channel_id)) {
            colorConsole.yellow("[channelEvent] 일정 추가 권한이 없습니다.");
            return res.status(403).json({ status : 403, message : "일정 추가 권한이 없습니다." });
        }
        
        body.channel_id = channel_id;
        await models.ChannelEvent.create(body);
        return res.status(200).json({ status : 200, message : "일정 추가에 성공하였습니다." });
    } catch(err) {
        colorConsole.red(err.message);
        return res.status(500).json({ status : 500, message : "일정 추가에 실패하였습니다." });
    }
}