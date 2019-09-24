const models = require('../../models');
const Validation = require('../../lib/validation');
const tokenLib = require('../../lib/token');
const randomCode = require('../../lib/randomCode');
const sendEmail = require('../../lib/sendEmail');
const colorConsole = require('../../lib/console');

exports.isOverlapped = async (req, res) => {
	colorConsole.green('[auth] 중복 확인');
	const { user_id } = req.body;
	
	colorConsole.gray('<request>');
	colorConsole.gray({ user_id });

	if (!user_id) {
		colorConsole.yellow('검증 오류입니다.');
		return res.status(400).json({ status : 400, message : '검증 오류입니다.' });
	}

	try {
		const overlapUser = await models.User.getUser(user_id);

		if (overlapUser) {
			colorConsole.yellow('[auth] 중복된 아이디입니다.');
			return res.status(400).json({ status : 400, message : '중복된 아이디입니다.' });     
		}
		
		return res.status(200).json({ status : 200, message : '중복되지 않은 아이디입니다.' });
	} catch(err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status : 500, message : '중복확인에 실패하였습니다.' });
	}
}

exports.sendEmail = async (req, res) => {
	colorConsole.green('[auth] 인증번호 발송');
	const { user_email } = req.body;
	const authCode = randomCode(6);
	
	colorConsole.gray('<request>');
	colorConsole.gray({ user_email });

	if (!user_email) {
		colorConsole.yellow('검증 오류입니다.');
		return res.status(400).json({ status : 400, message : '검증 오류입니다.' });
	}

	try {
		await sendEmail(user_email, '[단디] 인증번호', authCode);
		return res.status(200).json({ status : 200, message : '인증번호 발송에 성공하였습니다.', data : { authCode } });
	} catch(err) {
		if (err.status === 400) {
			colorConsole.yellow(err.message);
			return res.status(400).json({ status  : 400, message : err.message });
		}
		colorConsole.red(err.message);
		return res.status(500).json({ status : 500, message : '인증번호 발송에 실패하였습니다.' });
	}
}

exports.login = async (req, res) => {
	colorConsole.green('[auth] 로그인');
	const { user_id , user_pw } = req.body;

	colorConsole.gray('<request>');
	colorConsole.gray({ user_id });

	if (!(user_id && user_pw)) {
		colorConsole.yellow('검증 오류입니다.');
		return res.status(400).json({ status : 400, message : '검증 오류입니다' });
	}

	try {
		const userExist = await models.User.getUser(user_id);

		if (!userExist) {
			colorConsole.yellow('[auth] 유저 정보가 존재하지 않습니다.');
			return res.status(400).json({ status : 400, message : '유저 정보가 존재하지 않습니다.' });
		}

		const userData = await models.User.getUserForLogin(user_id, user_pw);
		
		if (!userData) {
			colorConsole.yellow('[auth] 비밀번호가 일치하지 않습니다.');
			return res.status(405).json({ status : 405, message : '비밀번호가 일치하지 않습니다.' });
		}
		
		if (!userData.isAllowed) {
			colorConsole.yellow('[auth] 승인되지 않은 유저입니다.');
			return res.status(401).json({ status : 401, message : '승인되지 않은 유저입니다.' });
		}

		const token = tokenLib.createToken(user_id);
		
		return res.status(200).json({ status : 200, message : '로그인에 성공하였습니다.', data : { 'x-access-token' : token } });
	} catch(err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status : 500, message : '로그인에 실패하였습니다.' });
	} 
}

exports.signUp = async (req, res) => {
	colorConsole.green('[auth] 회원가입');
	const { body } = req;
	
	body.permission = 1; //set permission(member)
	body.isAllowed = false;
	
	colorConsole.gray('<request>');
	colorConsole.gray({ user_id : body.user_id });

	try {
		await Validation.validateMemberSignup(body);
	} catch(err) {
		colorConsole.yellow('검증 오류입니다.');
		return res.status(400).json({ status : 400, message : '검증 오류입니다.' });
	}

	try {
		await models.User.createUser(body);
		return res.status(200).json({ status : 200, message : '회원가입이 완료되었습니다.' });
	} catch(err) {
		colorConsole.red(err.message);
		return res.status(500).json({status : 500, message : '회원가입에 실패하였습니다.'});
	}
}