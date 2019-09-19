const sendEmail = require('../../lib/sendEmail');
const colorConsole = require('../../lib/console');
const models = require('../../models');

exports.awaitUser = async (req, res) => {
	colorConsole.green('[adminPage] 승인대기 유저 조회');
	const { user } = req;

	if (user.permission !== 0) {
		colorConsole.yellow('[adminPage] 조회 권한이 없습니다.');
		return res.status(403).json({ status : 403, message : '조회 권한이 없습니다.' });
	}
  
	try {
		const awaitUsers = await models.User.awaitUser();

		if (!awaitUsers.length) {
			colorConsole.yellow('[adminPage] 승인대기 유저가 존재하지 않습니다');
			return res.status(400).json({ status : 400, message : '승인대기 유저가 존재하지 않습니다' });
		}
		colorConsole.gray('<response>');
		colorConsole.gray({ awaitUsers });
		return res.status(200).json({ status : 200, message : '승인대기 유저 조회에 성공하였습니다.', data : { awaitUsers } });
	} catch(err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status : 500, message : '승인대기 유저 조회에 실패하였습니다' });
	}
}

exports.allowUser = async (req, res) => {
	colorConsole.green('[adminPage] 승인대기 유저 승인');
	const { user } = req;
	const { allow_id } = req.query; //querystring (user_id : allow user id)
	
	colorConsole.gray('<request>');
	colorConsole.gray({ allow_id });
	
	if (!allow_id) {
		colorConsole.yellow('검증 오류입니다.');
		return res.status(400).json({ status : 400, message : '검증 오류입니다' });
	}
	
	if (user.permission !== 0) {
		colorConsole.yellow('[adminPage] 승인 권한이 없습니다.');
		return res.status(403).json({ status : 403, message : '승인 권한이 없습니다.' });
	}
	
	try {
		const allowInfo = await models.User.allowUser(allow_id);
		
		if (!allowInfo.legnth) {
			colorConsole.yellow('[adminPage] 가입신청이 존재하지 않습니다.');
			return res.status(400).json({ status : 400, message : '가입신청이 존재하지 않습니다.' });
		}
		
		await sendEmail(allowInfo.user_email, '[단디] 회원가입이 승인되었습니다.', '[단디] 회원가입이 승인되었습니다.');

		return res.status(200).json({ status : 200, message : '회원가입 승인이 성공하였습니다.' });
	} catch (err) {
		if (err.status === 400) {
			colorConsole.yellow(err.message);
			return res.status(400).json({ status  : 400, message : err.message });
		}
		
		colorConsole.red(err.message);
		return res.status(500).json({ status : 500, message : '회원가입 승인에 실패하였습니다.' });
	}
}

exports.rejectUser = async (req, res) => {
	colorConsole.green('[adminPage] 승인대기 유저 거절');
	const { user } = req;
    const { reject_id } = req.query; //querystring (user_id : reject user id)
    
    colorConsole.gray('<request>');
    colorConsole.gray({ reject_id });

    if (!reject_id) {
			colorConsole.yellow('검증 오류입니다.');
			return res.status(400).json({ status : 400, message : '검증 오류입니다' });
    }

    if (user.permission !== 0) {
			colorConsole.yellow('[adminPage] 거절 권한이 없습니다.');
			return res.status(403).json({ status : 403, message : '거절 권한이 없습니다.' });
    }
    
    try {
			const rejectInfo = await models.User.rejectUser(reject_id);
			
			if (!rejectInfo) {
				colorConsole.yellow('[adminPage] 가입신청이 존재하지 않습니다.');
				return res.status(400).json({ status : 400, message : '가입신청이 존재하지 않습니다.' });
			}

			await sendEmail(rejectInfo.user_email, '[단디] 회원가입이 거절되었습니다.', '[단디] 회원가입이 거절되었습니다.');
			return res.status(200).json({ status : 200, message : '회원가입 거절이 완료되었습니다.' });
    } catch(err) {
			if (err.status === 400) {
				colorConsole.yellow(err.message);
				return res.status(400).json({ status  : 400, message : err.message });
			}
			
			colorConsole.red(err.message);
			return res.status(500).json({ status : 500, message : '회원가입 거절에 실패하였습니다.' });
    }
}