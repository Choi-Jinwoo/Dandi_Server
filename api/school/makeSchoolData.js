const School = require("../../models/models").School;
const searchSchool = require("./searchSchool");

module.exports = function (req_school_id) {
    
    School.findOne({ //새로운 학교 데이터 생성
        where : { id : req_school_id }
    })
    .then((result) => {
        if (result === null || undefined) { //new School
            searchSchool.searchById(req_school_id)
            .then((school_list) => {
                School.create({
                    id : school_list.school_code,
                    name : school_list.school_name,
                    type : school_list.school_type,
                    office_code : school_list.office_code
                })
                .then(() => {
                    console.log("학교 생성에 성공하였습니다 id : " + req_school_id);
                    return true;
                })
                .catch((err) => {
                    console.log("학교를 생성중 오류가 발생하였습니다\n" +err);
                    return res.status(500).json({status : 500, message : "회원가입 중 오류가 발생하였습니다"});
                })
            })
            .catch((err) => {
                console.log("학교를 ID로 조회중 오류가 발생하였습니다\n" +err);
                return res.status(500).json({status : 500, message : "회원가입 중 오류가 발생하였습니다"});        
            })
        }
    })
    .catch((err) => {
        console.log("SCHOOL 조회중 오류가 발생하였습니다\n" +err);
        return res.status(500).json({status : 500, message : "회원가입 중 오류가 발생하였습니다"});
    })  
}