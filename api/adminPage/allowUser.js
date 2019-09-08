const models = require("../../models/models");
const findOrCreateSchool = require("../school/findOrCreateSchool");
const sendEmail = require("./sendEmail");
const colorConsole = require("../../lib/console");

module.exports = async (req, res) => {
    colorConsole.green("[adminPage] 승인대기 유저 승인");
    const user = req.user;
    const { allow_id } = req.query; //querystring (user_id : allow user id)
    
    colorConsole.gray("request");
    colorConsole.gray({ allow_id });
    
    if (!allow_id) {
        colorConsole.yellow("검증 오류입니다.");
        return res.status(400).json({ status : 400, message : "검증 오류입니다" });
    }

    if (user.permission !== 0) {
        colorConsole.yellow("[adminPage] 승인 권한이 없습니다.");
        return res.status(403).json({ status : 403, message : "승인 권한이 없습니다." });
    }
    
    try {
        const allowInfo = await models.User.findOne({ where : { user_id : allow_id , isAllowed : false } }); // find allow user
        
        if (!allowInfo) {
            colorConsole.yellow("[adminPage] 유저 정보가 존재하지 않습니다.");
            return res.status(400).json({ status : 400, message : "유저 정보가 존재하지 않습니다." });
        }
        if (allowInfo.isAllowed) {
            colorConsole.yellow("[adminPage] 이미 승인된 유저입니다.");
            return res.status(400).json({ status : 400, message : "이미 승인된 유저입니다." });
        }
        
        await findOrCreateSchool(allowInfo.school); //findOrCreate School data
        await models.User.update({ isAllowed : true }, { where : { user_id : allow_id } });
        await sendEmail(allowInfo.user_email, "[단디] 회원가입이 승인되었습니다.", "[단디] 회원가입이 승인되었습니다.");

        return res.status(200).json({ status : 200, message : "회원가입 승인이 완료되었습니다." });
    } catch(err) {
        
        if (err.status === 404) { //findOrCreateSchool error
            colorConsole.yellow(err.message);
            return res.status(404).json({ status : 404, message : err.message });
        } else if(err.status === 500) { //sendEmail error
            colorConsole.red(err.message);
            return res.status(500).json({ status : 500, message : err.message });
        } else if (err.status === 400) {
            colorConsole.yellow(err.message);
            return res.status(400).json({ status  : 400, message : err.message });
        }
        
        colorConsole.red(err.message);
        return res.status(500).json({ status : 500, message : "회원가입 승인에 실패하였습니다." });
    }
}