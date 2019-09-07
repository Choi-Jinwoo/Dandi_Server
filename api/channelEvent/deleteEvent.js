const models = require("../../models/models");
const colorConsole = require("../../lib/console");
const isMember = require("../channelEvent/isMember");
const getChannelId = require("../channelEvent/getChannelId");

module.exports = async (req, res) => {
    colorConsole.green("[channelEvent] 일정 삭제")
    const user = req.user;
    const { event_id }  = req.query; //querystring (event_id : delete event_id)
    
    if (!event_id) {
        colorConsole.gray("검증 오류입니다.");
        return res.status(400).json({ status : 400, message : "검증 오류입니다." });
    }

    try {
        const channelId = await getChannelId(event_id);

        if (!await isMember(user.user_id, channelId)) {
            colorConsole.yellow("[channelEvent] 일정 삭제 권한이 없습니다.")
            return res.status(403).json({ status : 403, message : "일정 삭제 권한이 없습니다." });
        }

        await models.ChannelEvent.destroy({ where : { id : event_id } });

        return res.status(200).json({ status : 200, message : "일정 삭제에 성공하였습니다." });
    } catch(err) {
        if (err.status === 404) {
            colorConsole.yellow(err.message);
            return res.status(err.status).json({ status : err.status, message : err.message });
        }
        colorConsole.gray(err.message);
        return res.status(500).json({ status : 500, message : "일정 삭제에 실패하였습니다." });
    }
}