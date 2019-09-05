const models = require("../../models/models");
const searchSchoolBy = require("./searchSchoolBy");
const colorConsole = require("../../lib/console");

module.exports = async function (schoolId) {
    try {
        const schoolData = await searchSchoolBy.searchById(schoolId);

        models.School.findOrCreate({
            where : { id : schoolId },
            defaults : {
                id : schoolId,
                name : schoolData.name,
                type : schoolData.type,
                office_code : schoolData.officeCode,
            },
        })
        .spread((school ,created) => {
            if (created) {
                colorConsole.green("학교 생성에 성공하였습니다.");
            }
        });
    } catch(err) {
        if (err === 404) {
            throw {
                status : 404,
                message : "학교 정보가 존재하지 않습니다.",
            } //no schoolInfo(throw 404 object)
        }
        
        colorConsole.red(err.message);
        throw err;
    }
}