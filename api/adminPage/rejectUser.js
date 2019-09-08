const models = require("../../models/models");
const sendEmail = require("./sendEmail");
const colorConsole = require("../../lib/console");

module.exports = async (req, res) => {
    colorConsole.green("[adminPage] 승인대기 유저 거절");
    const user = req.user;
    const { reject_id } = req.query; //querystring (user_id : reject user id)
    
    colorConsole.gray("request");
    colorConsole.gray({ reject_id });

    if (!reject_id) {
        colorConsole.yellow("검증 오류입니다.");
        return res.status(400).json({ status : 400, message : "검증 오류입니다" });
    }

    if (user.permission !== 0) {
        colorConsole.yellow("[adminPage] 거절 권한이 없습니다.");
        return res.status(403).json({ status : 403, message : "거절 권한이 없습니다." });
    }
    
    try {
        const rejectInfo = await models.User.findOne({ where : { user_id : reject_id } }); //find reject user
        
        if (!rejectInfo) {
            colorConsole.yellow("[adminPage] 유저 정보가 존재하지 않습니다.");
            return res.status(400).json({ status : 400, message : "유저 정보가 존재하지 않습니다." });
        }
        if (rejectInfo.isAllowed) {
            colorConsole.yellow("[adminPage] 이미 승인된 유저입니다.");
            return res.status(400).json({ status : 400, message : "이미 승인된 유저입니다." });
        }

        await models.User.destroy({ where : { user_id : reject_id } });
        await sendEmail(rejectInfo.user_email, "[단디] 회원가입이 거절되었습니다.", "[단디] 회원가입이 거절되었습니다.");

        return res.status(200).json({ status : 200, message : "회원가입 거절이 완료되었습니다." });
    } catch(err) {
        if (err.status === 500) { //sendEmail error
            colorConsole.red(err.message);
            return res.status(500).json({ status : 500, message : err.message });
        } else if (err.status === 400) {
            colorConsole.yellow(err.message);
            return res.status(400).json({ status  : 400, message : err.message });
        }
        
        colorConsole.red(err.message);
        return res.status(500).json({ status : 500, message : "회원가입 거절에 실패하였습니다." });
    }
    
}