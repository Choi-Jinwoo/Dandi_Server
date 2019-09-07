const request = require("request-promise");
const neisInfo = require("../../config/neisInfo");

exports.searchByName = async (school_name) => {
    const key = neisInfo.key;
    const url = `http://open.neis.go.kr/hub/schoolInfo?SCHUL_NM=${encodeURI(school_name)}&Type=json&KEY=${key}&pSize=800`;
    
    try {
        let schoolList;

        await request(url, (err, response, schoolInfo) => {
            if (err) {
                throw err;
            }

            schoolInfo = JSON.parse(schoolInfo);
            
            if(schoolInfo.RESULT !== undefined) {
                if (schoolInfo.RESULT.CODE === "INFO-200") { //no school info
                    throw {
                        status : 404,
                        message : "학교 정보가 존재하지 않습니다."
                    }
                }
            }

            const listCount = schoolInfo.schoolInfo[0].head[0].list_total_count;
            const _schoolList = [];
            for (let i = 0; i < listCount; i++) {
                _schoolList[i] = {
                    school_name : schoolInfo.schoolInfo[1].row[i].SCHUL_NM,
                    school_locate : schoolInfo.schoolInfo[1].row[i].ORG_RDNMA,
                    office_code : schoolInfo.schoolInfo[1].row[i].ATPT_OFCDC_SC_CODE,
                    school_code : schoolInfo.schoolInfo[1].row[i].SD_SCHUL_CODE,
                    school_type : schoolInfo.schoolInfo[1].row[i].SCHUL_KND_SC_NM,
                }
            }
            schoolList = _schoolList;
        });

        return schoolList;
    } catch(err) {
        throw err;
    }
}

exports.searchById = async (school_id) => {
    const key = neisInfo.key;
    const url = `http://open.neis.go.kr/hub/schoolInfo?SD_SCHUL_CODE=${encodeURI(school_id)}&Type=json&KEY=${key}`;
    
    try {
        let schoolInfo;
        await request(url, (err, response, _schoolInfo) => {
            if (err) {
                throw err;
            }

            _schoolInfo = JSON.parse(_schoolInfo);

            if(_schoolInfo.RESULT !== undefined) {
                if (schoolInfo.RESULT.CODE === "INFO-200") { //no school info
                    throw {
                        status : 404,
                        message : "학교 정보가 존재하지 않습니다."
                    }
                }
            }
            
            _schoolInfo = {
                school_name : _schoolInfo.schoolInfo[1].row[0].SCHUL_NM,
                school_locate : _schoolInfo.schoolInfo[1].row[0].ORG_RDNMA,
                office_code : _schoolInfo.schoolInfo[1].row[0].ATPT_OFCDC_SC_CODE,
                school_code : _schoolInfo.schoolInfo[1].row[0].SD_SCHUL_CODE,
                school_type : _schoolInfo.schoolInfo[1].row[0].SCHUL_KND_SC_NM,
            }
            
            schoolInfo = _schoolInfo;
        });

        return schoolInfo;
    } catch(err) {
        throw err;
    }
}