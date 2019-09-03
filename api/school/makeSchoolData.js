const School = require("../../models/models").School;
const searchSchoolBy = require("./searchSchoolBy");

module.exports = async function (req_school_id) {
    try {
        const school_data = await School.findOne({ where : {id : req_school_id }});

        if (!(school_data === null || school_data === undefined)) { //이미 학교가 존재한다면
            return 400;
        }

        const new_school_data =  await searchSchoolBy.searchById(req_school_id);
        
        await School.create({
            id : new_school_data.school_code,
            name : new_school_data.school_name,
            type : new_school_data.school_type,
            office_code : new_school_data.office_code
        })
        
        return 200;
        
    } catch(err) {
        if (err === 404) { //학교에 대한 정보가 없다면 404를 반환
            return 404;
        }
        throw err;
    }
    
}
