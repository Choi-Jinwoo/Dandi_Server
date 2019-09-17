const models = require("../../models");
const colorConsole = require("../../lib/console");
const isFounder = require("./isFounder");

module.exports = async (req, res) => {
    colorConsole.green("[channelAdmin] 승인대기 유저 조회");
    const user = req.user;
    const { channel_id } = req.query; //querystring (channel_id : request channel id)
    
    colorConsole.gray("request");
    colorConsole.gray({ channel_id });

    if (!channel_id) {
        colorConsole.yellow("검증 오류입니다.");
        return res.status(400).json({ status : 400, message : "검증 오류입니다" });
    }

    try {
        if (!await isFounder(user.user_id, channel_id)) {
            colorConsole.yellow("[channelAdmin] 조회 권한이 없습니다.");
            return res.status(403).json({ status : 403, message : "조회 권한이 없습니다." });
        }
        
        const awaitUsers = await models.ChannelUser.findAll({ where : { channel_id, isAllowed : false }, raw : true });
        
        if (!awaitUsers.length) {
            colorConsole.yellow("[channelAdmin] 승인대기 유저가 존재하지 않습니다.");
            return res.status(400).json({ status : 400, message : "승인대기 유저가 존재하지 않습니다." });
        }
        
        colorConsole.gray("response");
        colorConsole.gray({ awaitUsers });

        return res.status(200).json({ status : 200, message : "승인대기 유저 조회에 성공하였습니다.", data : { awaitUsers } });
    } catch(err) {
        colorConsole.red(err.message);
        return res.status(500).json({ status : 500, message : "승인대기 유저 조회에 실패하였습니다." });
    }
}