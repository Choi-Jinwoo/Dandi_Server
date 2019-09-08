const models = require("../../models/models");
const colorConsole = require("../../lib/console");
const Validation = require("../../lib/validation");

module.exports = async (req, res) => {
    colorConsole.green("[auth] 회원가입");

    const { body } = req;
    body.permission = 1; //set permission member
    body.profile_pic = null;
    body.isAllowed = false;
    
    const { user_id, user_name, user_email, user_phone, school, school_grade, school_class } = body;
    colorConsole.gray("request");
    colorConsole.gray({ user_id, user_name, user_email, user_phone, school, school_grade, school_class });

    try {
        await Validation.validateMemberSignup(body);
    } catch(err) {
        colorConsole.yellow("검증 오류입니다.");
        return res.status(400).json({ status : 400, message : "검증 오류입니다." });
    }
 
    try {
        await models.User.create(body);
        return res.status(201).json({ status : 201, message : "회원가입이 완료되었습니다." });
    } catch(err) {
        colorConsole.red(err.message);
        return res.status(500).json({status : 500, message : "회원가입에 실패하였습니다."});
    }
}