const models = require("../../models");
const colorConsole = require("../../lib/console");

module.exports = async (req, res) => {
    colorConsole.green("[adminPage] 승인대기 유저 조회");
    const user = req.user;

    if (user.permission !== 0) {
        colorConsole.yellow("[adminPage] 조회 권한이 없습니다.");
        return res.status(403).json({ status : 403, message : "조회 권한이 없습니다." });
    }
    
    try {
        const attributes = [ "user_id", "user_name", "user_email", "user_phone", "school", "school_grade", "school_class" ]; 
        const awaitUsers = await models.User.findAll({ attributes, where : { isAllowed : false }, raw : true });

        if (!awaitUsers.length) {
            colorConsole.yellow("[adminPage] 승인대기 유저가 존재하지 않습니다");
            return res.status(400).json({ status : 400, message : "승인대기 유저가 존재하지 않습니다" });
        }
        colorConsole.gray("response");
        colorConsole.gray({ awaitUsers });
        return res.status(200).json({ status : 200, message : "승인대기 유저 조회에 성공하였습니다.", data : { awaitUsers } });
    } catch(err) {
        colorConsole.red(err.message);
        return res.status(500).json({ status : 500, message : "승인대기 유저 조회에 실패하였습니다" });
    }
}