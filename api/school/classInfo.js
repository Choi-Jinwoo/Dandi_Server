const request = require("request-promise");
const neisInfo = require("../../config/neisInfo");
const colorConsole = require("../../lib/console");

module.exports = async (req, res) => {
    colorConsole.green("[school] 반 정보 조회");
    const key = neisInfo.key;
    const { school_id, office_id, grade } = req.query;
    const url = `http://open.neis.go.kr/hub/classInfo?SD_SCHUL_CODE=${school_id}&ATPT_OFCDC_SC_CODE=${office_id}&GRADE=${grade}&Type=json&KEY=${key}`;

    try {
        await request(url, (err, response, classInfo) => {
            if (err) {
                throw err;
            }

            classInfo = JSON.parse(classInfo);

            if(classInfo.RESULT !== undefined) {
                if (classInfo.RESULT.CODE === "INFO-200") { //no class info
                    colorConsole.yellow("학년 정보가 존재하지 않습니다.");
                    return res.status(404).json({ status : 404, message : "학년 정보가 존재하지 않습니다." });
                }
            }
            
            const classCount = classInfo.classInfo[0].head[0].list_total_count;
            return res.status(200).json({ status : 200, message : "학년 정보 조회에 성공하였습니다.", data : { classCount  } });
        })
    } catch(err) {
        colorConsole.gray(err.message);
        return res.status(500).json({ status : 500, message : "학년 정보 조회에 실패히였습니다." });
    }
}