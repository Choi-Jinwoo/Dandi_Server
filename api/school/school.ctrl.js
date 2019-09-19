const request = require('request-promise');
const neisInfo = require('../../config/neisInfo');
const colorConsole = require('../../lib/console');
const formatDate = require('../../lib/formatDate')

exports.searchByName = async (req, res) => {
	colorConsole.green('[school] 학교 조회');
	const { school_name }	 = req.query;
	const key = neisInfo.key;
	const url = `http://open.neis.go.kr/hub/schoolInfo?SCHUL_NM=${encodeURI(school_name)}&Type=json&KEY=${key}&pSize=800`;
	let schoolInfo;

	colorConsole.gray('<request>');
	colorConsole.gray({ school_name });

	if (!school_name) {
		colorConsole.yellow('검증 오류입니다.');
		return res.status(400).json({ status : 400, message : '검증 오류입니다.' });
	}

	await request(url, (err, response, _schoolInfo) => {
		try {
			if (err) {
				throw err;
			}
	
			_schoolInfo = JSON.parse(_schoolInfo);
			
			if(_schoolInfo.RESULT !== undefined) {
				if (_schoolInfo.RESULT.CODE === 'INFO-200') { //no school info
					colorConsole.yellow('[school] 학교 정보가 존재하지 않습니다.')
					return res.status(400).json({ status : 400, message : '학교 정보가 존재하지 않습니다.' });
				}
			}
			
			const listCount = _schoolInfo.schoolInfo[0].head[0].list_total_count;
			const _schoolList = [];
			
			for (let i = 0; i < listCount; i++) {
				_schoolList[i] = {
					school_name : _schoolInfo.schoolInfo[1].row[i].SCHUL_NM,
					school_locate : _schoolInfo.schoolInfo[1].row[i].ORG_RDNMA,
					office_code : _schoolInfo.schoolInfo[1].row[i].ATPT_OFCDC_SC_CODE,
					school_code : _schoolInfo.schoolInfo[1].row[i].SD_SCHUL_CODE,
					school_type : _schoolInfo.schoolInfo[1].row[i].SCHUL_KND_SC_NM,
				}
			}
	
			schoolInfo = _schoolList;
			return res.status(200).json({ status : 200, message : '학교 조회에 성공하였습니다.', data : { schoolInfo } });
		} catch(err) {
			colorConsole.red(err.message);
			return res.status(500).json({ status : 500, message : '학교 조회에 실패하였습니다.' });
		}
	});
}

exports.searchById = async (school_id) => {
	const key = neisInfo.key;
	const url = `http://open.neis.go.kr/hub/schoolInfo?SD_SCHUL_CODE=${encodeURI(school_id)}&Type=json&KEY=${key}`;
	
	
	let schoolInfo;
	
	return new Promise(async (resolve, reject) => {
		await request(url, (err, response, _schoolInfo) => {
			if (err) {
				return reject(err);
			}
	
		_schoolInfo = JSON.parse(_schoolInfo);
	
		if(_schoolInfo.RESULT !== undefined) {
			if (_schoolInfo.RESULT.CODE === 'INFO-200') { //no school info
				return reject({
					status : 404,
					message : '학교 정보가 존재하지 않습니다.'
				});
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
	
		return resolve(schoolInfo);
	});
}

exports.schoolInfo = async (req, res) => {
	colorConsole.green('[school] 학교 정보 조회');
	const { school_name } = req.query;

	colorConsole.gray('<request>');
	colorConsole.gray({ school_name });

	if (!school_name) {
		colorConsole.yellow('검증 오류입니다.');
		return res.status(400).json({ status : 400, message : '검증 오류입니다.' });
	}
	
	try {
		const schoolInfo = await exports.searchByName(school_name);
		colorConsole.gray('<response>');
		colorConsole.gray({ schoolInfo });
		return res.status(200).json({ status : 200, message : '학교 정보 조회에 성공하였습니다.', data : { schoolInfo }});
	} catch(err) { 
		if (err.status === 404) {
			colorConsole.yellow(err.message);
			return res.status(404).json({ status : 404, message : '학교 정보가 존재하지 않습니다.' });
		}
	}
}

exports.schoolEvent = async (req, res) => {
	colorConsole.green('[school] 학사일정 조회');
	const { user } = req;
	let { year, month } = req.query;
	
	colorConsole.gray('<request>');
	colorConsole.gray({ year, month });
	
	if (!(year && month)) {
		console.log('검증 오류입니다.');
		return res.status(400).json({ status : 400, message : '검증 오류입니다.' });
	}

	month = formatDate(month);

	if (month === NaN) {
		colorConsole.yellow('검증 오류입니다.');
		return res.status(400).json({ status : 400, message : '검증 오류입니다.' });
	}

	try {
		const schoolInfo = await exports.searchById(user.school);
		const key = neisInfo.key;
		const url = `http://open.neis.go.kr/hub/SchoolSchedule?ATPT_OFCDC_SC_CODE=${schoolInfo.office_code}&SD_SCHUL_CODE=${user.school}&AA_YMD=${year}${month}&key=${key}&type=json`;
		
		await request(url, (err, response, schoolEvent) => {
			if (err) {
				colorConsole.red(err.message);
				return res.status(500).json({ status : 500, message : '학사일정 조회에 실패하였습니다.' });
			}
			
			schoolEvent = JSON.parse(schoolEvent);
			const eventCount = schoolEvent.SchoolSchedule[0].head[0].list_total_count;
			
			let events = [];
			
			for (let i = 0; i < eventCount; i++) {
				const title = schoolEvent.SchoolSchedule[1].row[i].EVENT_NM;
				let start_date = schoolEvent.SchoolSchedule[1].row[i].AA_YMD;
				let end_date = schoolEvent.SchoolSchedule[1].row[i].AA_YMD;
				
				start_date = start_date.substring(0, 4) + '-' + start_date.substring(4, 6) + '-' + start_date.substring(6, 8);
				end_date = end_date.substring(0, 4) + '-' + end_date.substring(4, 6) + '-' + end_date.substring(6, 8);

				events[i] = { title, start_date, end_date }
			}
			
			colorConsole.gray('response');
			colorConsole.gray({ events });

			return res.status(200).json({ status : 200, message : '학사일정 조회에 성공하였습니다.', data : { events } });
		})
	} catch (err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status : 500, message : '학사일정 조회에 실패하였습니다.' });
	}
}

exports.classInfo = async (req, res) => {
	colorConsole.green('[school] 반 정보 조회');
	const key = neisInfo.key;
	const { school_id, office_id, grade } = req.query;

	colorConsole.gray('<request>');
	colorConsole.gray({ school_id, office_id, grade });

	if (!(school_id && office_id && grade)) {
		colorConsole.yellow('검증 오류입니다.');
		return res.status(400).json({ status : 400, message : '검증 오류입니다.' });
	}

	const url = `http://open.neis.go.kr/hub/classInfo?SD_SCHUL_CODE=${school_id}&ATPT_OFCDC_SC_CODE=${office_id}&GRADE=${grade}&Type=json&KEY=${key}`;

	try {
		await request(url, (err, response, classInfo) => {
			if (err) {
				colorConsole.red(err.message);
				return res.status(500).json({ status : 500, message : '학년 정보 조회에 실패히였습니다.' });
			}

			classInfo = JSON.parse(classInfo);

			if(classInfo.RESULT !== undefined) {
				if (classInfo.RESULT.CODE === 'INFO-200') { //no class info
					colorConsole.yellow('[school] 학년 정보가 존재하지 않습니다.');
					return res.status(404).json({ status : 404, message : '학년 정보가 존재하지 않습니다.' });
				}
			}
			const classCount = classInfo.classInfo[0].head[0].list_total_count;
			
			colorConsole.gray('response');
			colorConsole.gray({ classCount });

			return res.status(200).json({ status : 200, message : '학년 정보 조회에 성공하였습니다.', data : { classCount } });
		});
	} catch(err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status : 500, message : '학년 정보 조회에 실패히였습니다.' });
	}
}