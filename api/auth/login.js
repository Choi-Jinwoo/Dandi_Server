const models  = require("../../models/models");
const createToken = require("../../lib/token").createToken
const colorConsole = require("../../lib/console");

module.exports = async (req, res) => {
    colorConsole.green("[auth] 로그인");
    const { user_id , user_pw } = req.body;

    if (!(user_id && user_pw)) {
        colorConsole.gray("검증 오류입니다.");
        return res.status(400).json({ status : 400, message : "검증 오류입니다" });
    }

    try {
        const userData = await models.User.findOne({ where  : { user_id, user_pw }});
        
        if (!userData) {
            colorConsole.yellow("[auth] 유저 정보가 존재하지 않습니다.");
            return res.status(400).json({ status : 400, message : "유저 정보가 존재하지 않습니다." });
        }
        if (!userData.isAllowed) {
            colorConsole.yellow("[auth] 승인되지 않은 유저입니다.");
            return res.status(401).json({ status : 401, message : "승인되지 않은 유저입니다." });
        }

        const token = createToken(user_id);
        colorConsole.green("[auth] 로그인에 성공하였습니다.");
        colorConsole.gray(user_id);
        return res.status(200).json({ status : 200, message : "로그인에 성공하였습니다.", data : { token } });
    } catch(err) {
        colorConsole.gray(err.message);
        colorConsole.gray(user_id);
        return res.status(500).json({ status : 500, message : "로그인에 실패하였습니다." });
    } 
}
