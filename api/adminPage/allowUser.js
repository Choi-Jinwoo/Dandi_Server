const User = require("../../models/models").User;
const makeSchoolData = require("../school/makeSchoolData");

module.exports = function (req, res) {
    if (req.user.permission !== 0) {
        console.log("승인에 대한 권한이 없습니다 id : " + req.user.user_id);
        return res.status(403).json({status : 403, message : "승인에 대한 권한이 없습니다"});
    } else {

        const req_id = req.query.user_id; //queyrstring으로 user_id를 받아옴
        
        User.update({ isAllowed : true }, {where : {user_id : req_id}}) //req_id를 승인
        .then((result) => {
            makeSchoolData(req.user.school); //학교가 없다면 생성
            console.log("승인이 완료되었습니다 id : " + req_id);
            return res.status(200).json({status : 200, message : "승인이 완료되었습니다"});
        })
        .catch((err) => {
            console.log("승인중 예기치 못한 오류가 발생하였습니다\n" + err );
            return res.status(500).json({status : 500, message : "승인중 예기치 못한 오류가 발생하였습니다"});
        })
    }
}