const models = require("../../models/models");
const colorConsole = require("../../lib/console");
const isMember = require("./isMember");

module.exports = async (req, res) => {
    colorConsole.green("[channelEvent] 일정 검색")
    const user = req.user;
    const { channel_id, keyword } = req.query //querystring (channel_id : search channel_id, keyword : search keyword)
    
    colorConsole.gray("request");
    colorConsole.gray({ channel_id, keyword });

    if (!(channel_id && keyword)) {
        colorConsole.yellow("검증 오류입니다.");
        return res.status(400).json({ status : 400, message : "검증 오류입니다" });
    }

    try {
        if (!await isMember(user.user_id, channel_id)) {
            colorConsole.yellow("[channelEvent] 일정 검색 권한이 없습니다.")
            return res.status(403).json({ status : 403, message : "일정 검색 권한이 없습니다." });
        }

        const attributes = "user_id, user_name, user_email, school, school_grade, school_class, profile_pic, id, channel_id, title, start_date, end_date"
        const query = `SELECT ${attributes} FROM channelevents LEFT JOIN users ON channelevents.author=users.user_id WHERE channel_id = ${channel_id} AND title LIKE '%${keyword}%'`;
        const events = await models.sequelize.query(query, { type : models.Sequelize.QueryTypes.SELECT });
        
        if (!events.length) {
            colorConsole.yellow("[channelEvent] 검색 결과가 존재하지 않습니다.");
            return res.status(400).json({ status : 400, message : "검색 결과가 존재하지 않습니다." });
        }
        
        colorConsole.gray("response");
        colorConsole.gray({ events });
        
        return res.status(200).json({ status : 200, message : "일정 검색에 성공하였습니다." , data : { events } });
    } catch(err) {
        colorConsole.red(err.message);
        return res.status(500).json({ status : 500, message : "일정 검색에 실패하였습니다." });
    }
}