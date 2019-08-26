const User = require("../../models/models").User;
const makeSchoolData = require("../school/makeSchoolData");
const sendEmail = require("./sendEmail");

module.exports = async function (req, res) {
    const user = req.user;

    if (user.permission !== 0) {
        console.log("거절에 대한 권한이 없습니다 id : " + req.user.user_id);
        return res.status(403).json({status : 403, message : "거절에 대한 권한이 없습니다"});
    }

    const reject_id = req.query.user_id; //querystring으로 거절될 유저를 받아옴
    try {
        const req_info = await User.findOne({where : {user_id : reject_id}}); //거절될 유저의 정보 검색

        await User.destroy({where : {user_id : reject_id}}); //유저 거절
        
        await sendEmail(req_info.user_email, "[Schooler] 가입 거절되었습니다", "Schooler에 가입 거절되었습니다");

        console.log("거절이 완료되었습니다 id : " + reject_id);
        return res.status(200).json({status : 200, message : "거절이 완료되었습니다"});
    } catch(err) {
        console.log("거절중 오류가 발생하였습니다\n" + err);
        return res.status(500).json({status : 500, message : "거절중 오류가 발생하였습니다"});
    }
    
}