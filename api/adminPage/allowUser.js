const User = require("../../models/models").User;
const makeSchoolData = require("../school/makeSchoolData");
const sendEmail = require("./sendEmail");

module.exports = async function (req, res) {
    const user = req.user;

    if (user.permission !== 0) {
        console.log("승인에 대한 권한이 없습니다 id : " + req.user.user_id);
        return res.status(403).json({status : 403, message : "승인에 대한 권한이 없습니다"});
    }

    const allow_id = req.query.user_id; //querystring으로 승인될 유저를 받아옴
    try {
        const req_info = await User.findOne({where : { user_id : allow_id, isAllowed : false }}); //승인될 유저의 정보 검색
        
        if (req_info === null || req_info === undefined) {
            console.log("유저 정보가 없습니다 req_id : " + allow_id);
            return res.status(400).json({status : 400, message : "유저 정보가 없습니다"});
        }

        const result = await makeSchoolData(req_info.school);
        
        if (result === 404) { //학교정보가 없을경우
            console.log("학교 정보가 없습니다 school_id : " + req_info.school);
            return res.status(400).json({status : 400, message : "학교 정보가 없습니다"});
        } else if(result === 400) { //학교 정보가 이미 있을경우
            console.log("학교 정보가 이미 있습니다 school_id : " + req_info.school);
        }

        await User.update({ isAllowed : true}, {where : {user_id : allow_id}}); //유저 승인
        
        await sendEmail(req_info.user_email, "[Schooler] 가입 승인되었습니다", "Schooler에 가입 승인되었습니다");

        console.log("승인이 완료되었습니다 id : " + allow_id);
        return res.status(200).json({status : 200, message : "승인이 완료되었습니다"});
    } catch(err) {
        console.log("승인중 오류가 발생하였습니다\n" + err);
        return res.status(500).json({status : 500, message : "승인중 오류가 발생하였습니다"});
    }
    
}