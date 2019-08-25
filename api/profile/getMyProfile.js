const searchById = require("../school/searchSchool").searchById;

module.exports = async function(req, res) {
    try {
        const user = req.user;
        const schoolInfo = await searchById(user.school);
        
        const userInfo = {
            user_name : user.user_name,
            user_email : user.user_email,
            user_phone : user.user_phone,
            user_school : schoolInfo.school_name, //ID를 통해 이름을 가져옴
            school_class : user.school_class,
            profile_pic : user.profile_pic
        }

        console.log("프로필을 조회하였습니다 id : " + user.user_id);
        return res.status(200).json({status : 200, message : "프로필을 조회하였습니다", data : {userInfo}});
    } catch(err) {
        if (err === 404) {
            console.log("학교 정보가 없습니다 school_id : " + user.school);
            return res.status(400).json({status : 400, message : "학교 정보가 없습니다"});
        }

        console.log("프로필 조회중 오류가 발생하였습니다");
        return res.status(500).json({status : 500, message : "프로필 조회중 오류가 발생하였습니다"});
    }
    
}