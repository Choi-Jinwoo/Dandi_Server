const request = require("request-promise");
const colorConsole = require("../../lib/console");
const formatDate = require("../../lib/formatDate");
const neis = require("../../config/neisInfo");
const searchSchool = require("./searchSchool");
module.exports = async (req, res) => {
	colorConsole.green("[school] 학사일정 조회");
	const user = req.user;
	let { year, month } = req.query;
	
	colorConsole.gray("request");
	colorConsole.gray({ year, month });
	
	if (!(year && month)) {
		console.log("검증 오류입니다.");
		return res.status(400).json({ status : 400, message : "검증 오류입니다." });
	}

	month = formatDate(month);

	if (month === NaN) {
		colorConsole.yellow("검증 오류입니다.");
		return res.status(400).json({ status : 400, message : "검증 오류입니다." });
	}

	try {
		const schoolInfo = await searchSchool.searchById(user.school);
		const url = `http://open.neis.go.kr/hub/SchoolSchedule?ATPT_OFCDC_SC_CODE=${schoolInfo.office_code}&SD_SCHUL_CODE=${user.school}&AA_YMD=${year}${month}&key=${neis.key}&type=json`;
		
		await request(url, (err, response, schoolEvent) => {
			if (err) {
				colorConsole.red(err.message);
				return res.status(500).json({ status : 500, message : "학사일정 조회에 실패하였습니다." });
			}
			
			schoolEvent = JSON.parse(schoolEvent);
			const eventCount = schoolEvent.SchoolSchedule[0].head[0].list_total_count;
			let events = [];
			
			for (let i = 0; i < eventCount; i++) {
				const title = schoolEvent.SchoolSchedule[1].row[i].EVENT_NM;
				const start_date = schoolEvent.SchoolSchedule[1].row[i].AA_YMD;
				const end_date = schoolEvent.SchoolSchedule[1].row[i].AA_YMD;
				events[i] = { title, start_date, end_date }
			}
			
			colorConsole.gray("response");
			colorConsole.gray({ events });

			return res.status(200).json({ status : 200, message : "학사일정 조회에 성공하였습니다.", data : { events } });
		})
	} catch (err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status : 500, message : "학사일정 조회에 실패하였습니다." });
	}
}