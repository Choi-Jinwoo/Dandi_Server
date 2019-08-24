const User = require("../../models/models").User;
const createToken = require("../../lib/token").createToken
module.exports = function (req, res) {
    const req_id = req.body.user_id;
    const req_pw = req.body.user_pw;
    
    User.findOne({
        where : {
            user_id : req_id,
            user_pw : req_pw,
        },
    })
    .then((data) => {
        if (data === null || data === undefined) {
            console.log("일치하는 회원 정보가 없습니다 req ID : " + req_id)
            console.log("일치하는 회원 정보가 없습니다 req PW : " + req_pw)
            return res.status(401).json({ status : 401, message : "일치하는 회원 정보가 없습니다"});
        }

        if (!data.isAllowed) { //승인 되지 않은 유저 
            console.log("승인되지 않은 유저의 로그인 요청 id :" + req_id)
            return res.status(403).json({ status : 403, message : "승인되지 않은 유저입니다"});            
        }

        const token = createToken(req_id);
        
        console.log("회원이 접속하였습니다 ID : " + req_id);
        return res.status(200).json({ status : 200, message : "로그인에 성공 했습니다", data : {token}});
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ status : 500, message : "예기치 못한 오류가 발생하였습니다"});
    })
}
