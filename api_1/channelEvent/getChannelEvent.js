const models = require("../../models");
const colorConsole = require("../../lib/console");
const isMember = require("./isMember");

module.exports = async (req, res) => {
    colorConsole.green("[channelEvent] 일정 조회");
    const user = req.user;
    const { channel_id } = req.query; //querystring (channel_id : get events channel)
    
    colorConsole.gray("request");
    colorConsole.gray({ channel_id });

    if (!channel_id) {
        colorConsole.yellow("검증 오류입니다.");
        return res.status(400).json({ status : 400, message : "검증 오류입니다." });
    }

    try {
        if (!await isMember(user.user_id, channel_id)) {
            colorConsole.yellow("[channelEvent] 일정 조회 권한이 없습니다.")
            return res.status(403).json({ status : 403, message : "일정 조회 권한이 없습니다." });
        }

        const attributes = "user_id, user_name, user_email, school, school_grade, school_class, profile_pic, id, channel_id, title, start_date, end_date"
        const replacements = {
            channel_id,
        }

        const query = `SELECT ${attributes} FROM channelevents LEFT JOIN users ON channelevents.author=users.user_id WHERE channel_id = :channel_id`;
        const events = await models.sequelize.query(query, { replacements, type : models.Sequelize.QueryTypes.SELECT });
        
        colorConsole.gray("response");
        colorConsole.gray({ events });

        return res.status(200).json({ status : 200, message : "일정 조회에 성공하였습니다.", data : { events } });
    } catch(err) {
        colorConsole.red(err.message);
        return res.status(500).json({ status : 500, message : "일정 조회에 실패하였습니다." });
    }
}