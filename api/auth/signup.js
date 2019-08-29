const User = require("../../models/models").User;

module.exports = async function (req, res) {
    const req_user_id = req.body.user_id;
    const req_user_pw = req.body.user_pw;
    const req_user_name = req.body.user_name;
    const req_user_email = req.body.user_email;
    const req_school_id = req.body.school;
    const req_user_phone = req.body.phone; //allowNull
    const req_school_class = req.body.school_class;
    const req_school_grade = req.body.school_grade;
    const req_profile_pic = req.body.profile_pic; //allowNull
    const req_pushNotify = req.body.pushNotify;
    const req_isPublic = req.body.isPublic;

    try {
        const userData = await User.create({
            user_id : req_user_id,
            user_pw : req_user_pw,
            user_name : req_user_name,
            permission : 1, //member로 고정
            user_email : req_user_email,
            user_phone : req_user_phone,
            school : req_school_id,
            school_grade : req_school_grade,
            school_class : req_school_class,
            profile_pic : req_profile_pic,
            pushNotify : req_pushNotify,
            isPublic : req_isPublic
        })

        console.log("회원가입하였습니다 id : " + userData.user_id);
        return res.status(201).json({status : 201, message : "회원가입이 완료되었습니다"});
    } catch(err) {
        console.log("회원가입에 실패하였습니다\n" +err);
        return res.status(500).json({status : 500, message : "회원가입중 오류가 발생하였습니다"});
    }
}