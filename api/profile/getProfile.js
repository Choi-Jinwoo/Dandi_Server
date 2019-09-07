const models = require("../../models/models");
const searchSchool = require("../school/searchSchool");
const colorConsole = require("../../lib/console");

module.exports = async (req, res) => {
    colorConsole.green("[profile] 프로필 조회");
    const user = req.user;
    const { user_id } = req.query; //querystring (user_id : other_id)

    if (!user_id) {
        try {
            const { user_id, user_name, user_email, user_phone, school, school_grade, school_class, profile_pic, isPublic } = user;
            const userInfo = { user_id, user_name, user_email, user_phone, school, school_grade, school_class, profile_pic, isPublic };
            userInfo.school = await searchSchool.searchById(user.school);;
    
            return res.status(200).json({ status : 200, message : "프로필 조회에 성공하였습니다.", data : { userInfo } });
        } catch(err) {
            colorConsole.gray(err);
            if (err.status === 404) {
                return res.status(404).json({ status : 404, message : err.message });
            }
    
            return res.status(500).json({ status : 500, message : "프로필 조회에 실패하였습니다." });
        }
    }
    
    try {
        const attributes = [ "user_id", "user_name", "user_email", "user_phone", "school", "school_grade", "school_class", "profile_pic", "isPublic" ];
        const userInfo = await models.User.findOne({ attributes ,  where : { user_id } });
        userInfo.school = await searchSchool.searchById(userInfo.school);

        if (!userInfo) {
            colorConsole.yellow("[profile] 유저 정보가 존재하지 않습니다.");
            return res.status(400).json({ status : 400, message : "유저 정보가 존재하지 않습니다." });
        }
        
        if (userInfo.school.school_code !== user.school) {
            colorConsole.yellow("[profile] 다른 학교 유저입니다.");
            return res.status(400).json({ status : 400, message : "다른 학교 유저입니다." });
        }
        
        if (!userInfo.isPublic) {
            colorConsole.yellow("[profile] 비공개 유저입니다.");
            return res.status(400).json({ status : 400, message : "비공개 유저입니다." });
        }

        return res.status(200).json({ status : 200, message : "프로필 조회에 성공하였습니다.", data : { userInfo } });
    } catch(err) {
        colorConsole.gray(err.message);
        return res.status(500).json({ status : 500, message : "프로필 조회에 실패하였습니다." });        
    }
}