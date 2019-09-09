const models = require("../../models/models");
const searchSchool = require("./searchSchool");
const colorConsole = require("../../lib/console");

module.exports = async (schoolId) => {
    try {
        const schoolData = await searchSchool.searchById(schoolId);

        models.School.findOrCreate({
            where : { id : schoolId },
            defaults : {
                id : schoolId,
                name : schoolData.school_name,
                type : schoolData.school_type,
                office_code : schoolData.office_code,
            },
        })
        .spread((school ,created) => {
            if (created) {
                return;
            }
        });
    } catch(err) {
        if (err === 404) {
            throw {
                status : 404,
                message : "학교 정보가 존재하지 않습니다.",
            } //no schoolInfo(throw 404 object)
        }
        
        throw err;
    }
}