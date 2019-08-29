const User = require("../../models/models").User;

module.exports = async (req, res) => {
    if (req.user.permission !== 0) { //권한 확인
        console.log("관리자 페이지에 대한 권한이 없습니다 id : " + req.user.user_id);
        return res.status(403).json({status : 403, message : "권한이 없습니다"});
    } else {
        try {
            const userData = await User.findAll({isAllowed : false});

            console.log("관리자가 유저정보를 조회하였습니다 id : " + req.user.user_id)
            return res.status(200).json({status : 200, message : "승인되지 않은 유저 정보 조회에 성공하였습니다", data : { user : userData }});
        } catch(err) {
            console.log("관리자가 유저정보를 조회하는중 오류가 발생하였습니다\n" + err);
            return res.status(500).json({status : 500, message : "승인되지 않은 유저 정보 조회중 오류가 발생하였습니다"});
        }
    }
}