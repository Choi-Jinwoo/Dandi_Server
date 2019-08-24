const request = require("request");
const neisInfo = require("../../config/neisInfo");

const searchByName = function (school_name) {
    const key = neisInfo.key;
    const url = `http://open.neis.go.kr/hub/schoolInfo?SCHUL_NM=${encodeURI(school_name)}&Type=json&KEY=${key}`;
    
    return new Promise((resolve, reject) => {
        request(url, (err, res, schoolInfo) => {
            if (err) {
                reject(err);
            }

            try {
                schoolInfo = JSON.parse(schoolInfo);
                
                let listCount = schoolInfo.schoolInfo[0].head[0].list_total_count; //학교 개수
                const schoolList = [];
                
                for (let i = 0; i < listCount; i++) {
                    schoolList[i] = {
                        school_name : schoolInfo.schoolInfo[1].row[i].SCHUL_NM,
                        school_locate : schoolInfo.schoolInfo[1].row[i].ORG_RDNMA,
                        office_code : schoolInfo.schoolInfo[1].row[i].ATPT_OFCDC_SC_CODE,
                        school_code : schoolInfo.schoolInfo[1].row[i].SD_SCHUL_CODE,
                        school_type : schoolInfo.schoolInfo[1].row[i].SCHUL_KND_SC_NM
                    }
                }
                
                resolve(schoolList);
            } catch(err) {
                reject(err);
            }
        })
    })
}

const searchById = function (school_id) {
    const key = neisInfo.key;
    const url = `http://open.neis.go.kr/hub/schoolInfo?SD_SCHUL_CODE=${encodeURI(school_id)}&Type=json&KEY=${key}`;
    
    return new Promise((resolve, reject) => {
        request(url, (err, res, schoolInfo) => {
            if (err) {
                reject(err);
            }
            try {
                schoolInfo = JSON.parse(schoolInfo);
                
                let schoolList;
                
                schoolList = {
                    school_name : schoolInfo.schoolInfo[1].row[0].SCHUL_NM,
                    school_locate : schoolInfo.schoolInfo[1].row[0].ORG_RDNMA,
                    office_code : schoolInfo.schoolInfo[1].row[0].ATPT_OFCDC_SC_CODE,
                    school_code : schoolInfo.schoolInfo[1].row[0].SD_SCHUL_CODE,
                    school_type : schoolInfo.schoolInfo[1].row[0].SCHUL_KND_SC_NM
                }
                
                resolve(schoolList);
            } catch(err) {
                reject(err);
            }
        })
    })
}

module.exports = {
    searchByName,
    searchById
}