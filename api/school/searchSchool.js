const request = require("request");
const neisInfo = require("../../config/neisInfo");

const searchByName = async function (school_name) {
    const key = neisInfo.key;
    const url = `http://open.neis.go.kr/hub/schoolInfo?SCHUL_NM=${encodeURI(school_name)}&Type=json&KEY=${key}`;
    
    return new Promise((resolve, reject) => {
        request(url, (err, res, schoolInfo) => {
            if (err) {
                return reject(err);
            }

            schoolInfo = JSON.parse(schoolInfo);
            
            try {
                if (schoolInfo.RESULT.CODE === "INFO-200") { //학교 정보가 없을경우 false반환
                    return reject(404);
                }
            } catch(err) {}

            let listCount = schoolInfo.schoolInfo[0].head[0].list_total_count; //학교 개수
            const schoolList = [];

            try {
                for (let i = 0; i < listCount; i++) {
                    schoolList[i] = {
                        school_name : schoolInfo.schoolInfo[1].row[i].SCHUL_NM,
                        school_locate : schoolInfo.schoolInfo[1].row[i].ORG_RDNMA,
                        office_code : schoolInfo.schoolInfo[1].row[i].ATPT_OFCDC_SC_CODE,
                        school_code : schoolInfo.schoolInfo[1].row[i].SD_SCHUL_CODE,
                        school_type : schoolInfo.schoolInfo[1].row[i].SCHUL_KND_SC_NM
                    }
                }
            } catch(err) {
                return reject(err);
            }
            
            return resolve(schoolList);
        })
    })
}

const searchById = async function (school_id) {
    const key = neisInfo.key;
    const url = `http://open.neis.go.kr/hub/schoolInfo?SD_SCHUL_CODE=${encodeURI(school_id)}&Type=json&KEY=${key}`;
    
    return new Promise((resolve, reject) => {
        request(url, (err, res, schoolInfo) => {
            if (err) {
                return reject(err);
            }
            
            schoolInfo = JSON.parse(schoolInfo);
            
            try {
                if (schoolInfo.RESULT.CODE === "INFO-200") { //학교 정보가 없을경우 404반환
                    return reject(404);
                }
            } catch(err) {} //학교 정보가 있음
            try {
                return resolve({ //학교 정보를 반환함
                    school_name : schoolInfo.schoolInfo[1].row[0].SCHUL_NM,
                    school_locate : schoolInfo.schoolInfo[1].row[0].ORG_RDNMA,
                    office_code : schoolInfo.schoolInfo[1].row[0].ATPT_OFCDC_SC_CODE,
                    school_code : schoolInfo.schoolInfo[1].row[0].SD_SCHUL_CODE,
                    school_type : schoolInfo.schoolInfo[1].row[0].SCHUL_KND_SC_NM
                });
            } catch(err) {
                return reject(err);
            }
            
        })  
    })

    /*
    try {
        await request(url, (err, res, schoolInfo) => {
            if (err) {
                throw err;
            }
            
            schoolInfo = JSON.parse(schoolInfo);
            
            try {
                if (schoolInfo.RESULT.CODE === "INFO-200") { //학교 정보가 없을경우 404반환
                    return 404;
                }
            } catch(err) {} //학교 정보가 있음
            
            return schoolList = { //학교 정보를 반환함
                school_name : schoolInfo.schoolInfo[1].row[0].SCHUL_NM,
                school_locate : schoolInfo.schoolInfo[1].row[0].ORG_RDNMA,
                office_code : schoolInfo.schoolInfo[1].row[0].ATPT_OFCDC_SC_CODE,
                school_code : schoolInfo.schoolInfo[1].row[0].SD_SCHUL_CODE,
                school_type : schoolInfo.schoolInfo[1].row[0].SCHUL_KND_SC_NM
            }
        })    
    } catch(err) {
        throw err;
    }
    */
    
}

module.exports = {
    searchByName,
    searchById
}