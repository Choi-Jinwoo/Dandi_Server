const searchSchool = require("./searchSchoolBy").searchByName;

module.exports = async function (req, res) {
	try {
		const schoolInfo = await searchSchool(req.query.school_name); //querystring으로 학교이름을 받아옴

		console.log("학교에 대한 정보를 조회하였습니다 school : " + req.query.school_name);
		return res.status(200).json({status : 200, message : "학교에 대한 정보를 조회하였습니다", data : {schoolInfo}});
	} catch(err) {
		if (err === 404) { //학교에 대한 정보가 없다면
				console.log("학교에 대한 정보가 없습니다 school_name : " + req.query.school_name);
				return res.status(400).json({status : 400, message : "학교에 대한 정보가 없습니다"});
		}
		
		console.log("학교에 대한 정보를 조회하는중 오류가 발생하였습니다\n" + err);
		return res.status(500).json({status : 500, message : "학교에 대한 정보를 조회하는중 오류가 발생하였습니다"});
	}
}