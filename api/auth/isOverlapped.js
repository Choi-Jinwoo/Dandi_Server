const User = require("../../models/models").User;

module.exports = async function (req, res) {
    req_id = req.body.user_id;

    try {
        const userDate = await User.findOne({where : {user_id : req_id}});

        if (userDate === null || userDate === undefined) { //중복되지 않았을 경우
            console.log("중복되지 않은 아이디입니다 id : " + req_id);
            return res.status(200).json({status : 200, message : "중복되지 않은 아이디 입니다", data : {isOverlapped : false}});
        }

        console.log("중복된 아이디입니다 id : " + req_id); //중복될 경우
        return res.status(400).json({status : 400, message : "중복된 아이디 입니다", data : {isOverlapped : true}});     
    } catch(err) {
        console.log("아이디 중복 확인중 오류 발생\n" + err);
        return res.status(500).json({status : 500, message : "아이디 중복 확인중 오류 발생"})
    }
}