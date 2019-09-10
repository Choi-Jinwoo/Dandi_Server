const models = require("../../models/models");
const colorConsole = require("../../lib/console");
const isMember = require("../channelEvent/isMember");
const getChannelId = require("../channelEvent/getChannelId");

module.exports = async function (req, res) {
    colorConsole.green("[channelEvent] 일정 변경");
    const user = req.user;
    const { event_id } = req.query; //querystirng(event_id : update event id)
    const { body } = req;
    body.author = user.user_id;
    
    colorConsole.gray("request");
    colorConsole.gray({ event_id, body });

    if (!event_id) {
        colorConsole.yellow("검증 오류입니다.");
		return res.status(400).json({ status : 400, message : "검증 오류입니다." });
    }

    try {
        const channelId = await getChannelId(event_id);
        
        if (!await isMember(user.user_id, channelId)) {
            colorConsole.yellow("[channelEvent] 일정 변경 권한이 없습니다.");
            return res.status(403).json({ status : 403, message : "일정 변경 권한이 없습니다." });
        }
        
        await models.ChannelEvent.update( body, { where : { id : event_id } });
        return res.status(200).json({ status : 200, message : "일정 변경에 성공하였습니다." });
    } catch(err) {
        colorConsole.red(err.message);
        return res.status(500).json({ status : 500, message : "일정 변경에 실패하였습니다." });
    }
}