const models = require("../../models/models");
const colorConsole = require("../../lib/console");
const isMember = require("./isMember");
const sequelize = require("sequelize");

module.exports = async (req, res) => {
    colorConsole.green("[channelEvent] 일정 검색")
    const user = req.user;
    
    const { channel_id, keyword } = req.query //querystring (channel_id : search channel_id, keyword : search keyword)
    
    if (!(channel_id && keyword)) {
        colorConsole.gray("검증 오류입니다.");
        return res.status(400).json({ status : 400, message : "검증 오류입니다" });
    }

    try {
        if (!await isMember(user.user_id, channel_id)) {
            colorConsole.yellow("[channelEvent] 일정 검색 권한이 없습니다.")
            return res.status(403).json({ status : 403, message : "일정 검색 권한이 없습니다." });
        }

        const events = await ChannelEvent.findAll({ where : { title : { [sequelize.Op.like] : "%" + searchKeyword + "%" }, channel_id } });
        
        if (!events.length) {
            colorConsole.yellow("[channelEvent] 검색 결과가 존재하지 않습니다.");
            return res.status(400).json({ status : 400, message : "검색 결과가 존재하지 않습니다." });
        }
        
        return res.status(200).json({ status : 200, message : "일정 검색에 성공하였습니다." , data : { events } });
    } catch(err) {
        colorConsole.gray(err.message);
        return res.status(500).json({ status : 500, message : "일정 검색에 실패하였습니다." });
    }
}