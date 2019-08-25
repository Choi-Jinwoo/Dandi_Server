const User = require("../../models/models").User;
const searchById = require("../school/searchSchool").searchById;

module.exports = async function (req, res) {
    const user = req.user;
    const other_id = req.query.user_id; //querystring으로 다른사람의 id를 받아옴

    try {
        const otherData = await User.findOne({
            where : { user_id : other_id }
        })
        
        if (otherData === null || otherData === undefined) {
            console.log("존재하지 않는 유저입니다 id : " + user.user_id);
            return res.status(400).json({status : 400, message : "존재하지 않는 유저입니다"});
        }
        
        if (otherData.school !== user.school) { //다른 학교 사람의 프로필일경우
            console.log("다른 학교 사람의 프로필입니다 id : " + user.user_id);
            return res.status(400).json({status : 400, message : "다른 학교 사람의 프로필입니다"});
        }

        if (!otherData.isPublic) { //비공개 설정인 프로필인경우
            console.log(`${otherData.user_id} 은 비공개 계정입니다 id : ${user.user_id}`);
            return res.status(403).json({status : 403, message : "비공개 계정입니다"});
        }

        const schoolInfo = await searchById(otherData.school);

        const otherInfo = {
            other_name : otherData.user_name,
            other_email : otherData.user_email,
            other_phone : otherData.user_phone,
            other_school : schoolInfo.school_name, //ID를 통해 이름을 가져옴
            school_class : user.school_class,
            profile_pic : user.profile_pic
        }

        console.log("다른 사람의 프로필을 조회하였습니다 id : " + user.user_id);
        return res.status(200).json({status : 200, message : "다른 사람의 프로필을 조회하였습니다", data : { otherInfo }})
    } catch(err) {
        console.log("다른사람의 프로필 조회중 오류가 발생하였습니다\n" + err);
        return res.status(500).json({status : 500, message : "다른사람의 프로필 조회중 오류가 발생하였습니다"});
    }
    
}