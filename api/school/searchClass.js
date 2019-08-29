const request = require("request");
const searchById = require("./searchSchoolBy").searchById; //아이디로 학교정보를 찾음
const neisInfo = require("../../config/neisInfo");

module.exports = async function(req, res) {
    const school_id = req.query.school_id;
    const office_id = req.query.office_id;
    const grade = req.query.grade;
    
    const key = neisInfo.key;
    const url = `http://open.neis.go.kr/hub/classInfo?SD_SCHUL_CODE=${school_id}&ATPT_OFCDC_SC_CODE=${office_id}&GRADE=${grade}&Type=json&KEY=${key}`;

    try {
        await request(url, (err, response, classInfo) => {
            if (err) {
                throw err;
            }

            classInfo = JSON.parse(classInfo);

            try {
                if (classInfo.RESULT.CODE === "INFO-200") { //학교 정보가 없을경우 404반환
                    console.log("학교, 학년에 대한 데이터가 없습니다");
                    return res.status(400).json({status : 400, message : "학교, 학년에 대한 데이터가 없습니다"});
                }
            } catch(err) {console.log(err)} //학교 정보가 있음
            
            const listCount = classInfo.classInfo[0].head[0].list_total_count; //반 개수
            console.log(`[${school_id}]학교의 ${grade}학년에 대한 데이터를 조회하였습니다`);
            return res.status(200).json({status : 200, message : "학년 데이터 조회에 성공하였습니다", data : { classCount : listCount }});
        })
    } catch(err) {
        console.log("학년 정보를 조회중 오류가 발생하였습니다\n" + err);
        return res.status(500).json({status : 500, message : "학년 정보를 조회중 오류가 발생하였습니다"});
    }
    
}