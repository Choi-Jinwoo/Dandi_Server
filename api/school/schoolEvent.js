const request = require("request");
const neis = require("../../config/neisInfo");
const searchSchoolById = require("./searchSchoolBy").searchById;

module.exports = async function(req, res) {
	const user = req.user;
	let { year, month } = req.query;
	
	if (!(year && month)) {
		console.log("날짜가 설정되지 않았습니다");
		return res.status(400).json({status : 400, message : "날짜가 설정되지 않았습니다"});
	}

	month = formatDate(month);

	if (month === NaN) {
		console.log("데이터가 숫자가 아닙니다 data : " + data);
		return res.status(400).json({status : 400, message : "데이터가 숫자가 아닙니다"});
	}

	let schoolData;

	try {
		schoolData = await searchSchoolById(user.school);
		const url = `http://open.neis.go.kr/hub/SchoolSchedule?ATPT_OFCDC_SC_CODE=${schoolData.office_code}&SD_SCHUL_CODE=${user.school}&AA_YMD=${year}${month}&key=${neis.key}&type=json`;
		console.log(url);
		await request(url, (err, response, schoolEvent) => {
			if (err) {
				console.log("학교 일정 조회중 오류가 발생하였습니다\n" + err);
				return res.status(500).json({status : 500, message : "학교 일정 조회중 오류가 발생하였습니다"});
			}
			
			schoolEvent = JSON.parse(schoolEvent);
			const eventCount = schoolEvent.SchoolSchedule[0].head[0].list_total_count;
			let eventList = [];
			for (let i = 0; i < eventCount; i++) {
				const title = schoolEvent.SchoolSchedule[1].row[i].EVENT_NM;
				const date = schoolEvent.SchoolSchedule[1].row[i].AA_YMD;
				eventList[i] = {
					title,
					date
				}
			}
			
			console.log("학교 일정 조회에 성공하였습니다 school_id : " + user.school);
			return res.status(200).json({status : 200, message : "학교 일정 조회에 성공하였습니다" , data : {eventList}});
		})
	} catch (err) {
		console.log("학교 일정 조회중 오류가 발생하였습니다\n" + err);
		return res.status(500).json({status : 500, message : "학교 일정 조회중 오류가 발생하였습니다"});
	}	
}

function formatDate(data) { //날짜 포맷
	if (!parseInt(data)) {
		return NaN;
	}
	if (parseInt(data) < 10) {
			data = parseInt(data);
			return `0${data}`;
	} else {
			return data;
	}
}