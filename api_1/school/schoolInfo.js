const searchSchool = require("./searchSchool");
const colorConsole = require("../../lib/console");

module.exports = async (req, res) => {
	colorConsole.green("[school] 학교 정보 조회");
	const { school_name } = req.query;

	colorConsole.gray("request");
	colorConsole.gray({ school_name });

	if (!school_name) {
		colorConsole.yellow("검증 오류입니다.");
		return res.status(400).json({ status : 400, message : "검증 오류입니다." });
	}
	
	try {
		const schoolInfo = await searchSchool.searchByName(school_name);
		colorConsole.gray("response");
		colorConsole.gray({ schoolInfo });
		return res.status(200).json({ status : 200, message : "학교 정보 조회에 성공하였습니다.", data : { schoolInfo }});
	} catch(err) { 
		if (err.status === 404) {
			colorConsole.yellow(err.message);
			return res.status(404).json({ status : 404, message : "학교 정보가 존재하지 않습니다." });
		}
	}
	// searchSchool.searchByName(school_name)
	// 	.then((schoolInfo) => {
	// 		colorConsole.gray("response");
	// 		colorConsole.gray({ schoolInfo });
			
	// 		return res.status(200).json({ status : 200, message : "학교 정보 조회에 성공하였습니다.", data : { schoolInfo }});
	// 	})
	// 	.catch((err) => {
	// 		if (err.status === 404) {
	// 			colorConsole.yellow(err.message);
	// 			return res.status(404).json({ status : 404, message : "학교 정보가 존재하지 않습니다." });
	// 		}
		
	// 		colorConsole.red(err.message);
	// 		return res.status(500).json({ status : 500, message : "학교 정보 조회에 실패하였습니다." });
	// 	});
}