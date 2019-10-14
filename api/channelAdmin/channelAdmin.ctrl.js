const models = require('../../models');
const colorConsole = require('../../lib/console');
const Validation = require('../../lib/validation');
const { getProfileUrl } = require('../image/image.ctrl');
const { searchById } = require('../school/school.ctrl');
const { getThumbnailUrl } = require('../image/image.ctrl');

exports.createChannel = async (req, res) => {
	colorConsole.green('[channelAdmin] 개설 채널 조회');
	const { user } = req;
	try {
		const createChannels = await models.Channel.getChannelByCreateUser(user.user_id);

		if (!createChannels.length) {
			colorConsole.yellow('[channelAdmin] 개설 채널이 존재하지 않습니다.');
			return res.status(204).json({ status: 204, message: '개설 채널이 존재하지 않습니다.' });
		}

		for (let i = 0; i < createChannels.length; i++) {
			createChannels[i].thumbnail = await getThumbnailUrl(req, createChannels[i].id);
		}

		colorConsole.gray('<response>');
		colorConsole.gray({ createChannels });

		return res.status(200).json({ status: 200, message: '개설 채널 조회에 성공하였습니다.', data: { createChannels } });
	} catch (err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status: 500, message: '개설 채널 조회에 실패하였습니다.' });
	}
}

exports.awaitUser = async (req, res) => {
	colorConsole.green('[channelAdmin] 승인대기 유저 조회');
	const { user } = req;
	const { channel_id } = req.query; //querystring (channel_id : request channel id)

	colorConsole.gray('<request>');
	colorConsole.gray({ channel_id });

	if (!channel_id) {
		colorConsole.yellow('검증 오류입니다.');
		return res.status(400).json({ status: 400, message: '검증 오류입니다' });
	}

	try {
		if (!await models.Channel.isFounder(user.user_id, channel_id)) {
			colorConsole.yellow('[channelAdmin] 조회 권한이 없습니다.');
			return res.status(403).json({ status: 403, message: '조회 권한이 없습니다.' });
		}

		const awaitUsers = await models.ChannelUser.awaitUser(channel_id);

		if (!awaitUsers.length) {
			colorConsole.yellow('[channelAdmin] 승인대기 유저가 존재하지 않습니다.');
			return res.status(204).json({ status: 204, message: '승인대기 유저가 존재하지 않습니다.' });
		}

		for (let i = 0; i < awaitUsers.length; i++) {
			awaitUsers[i] = await models.User.getUserData(awaitUsers[i].user_id);
			awaitUsers[i].profile_pic = await getProfileUrl(req, awaitUsers[i].user_id);
			searchById(awaitUsers[i].school)
				.then(async (schoolInfo) => {
					awaitUsers[i].school = schoolInfo;
				})
				.catch(async (err) => {
					if (err.status === 404) {
						colorConsole.yellow(err.message);
						return res.status(404).json({ status: 404, message: err.message });
					} else {
						colorConsole.red(err.message);
						return res.status(500).json({ status: 500, message: '승인대기 유저 조회에 실패하였습니다.' });
					}
				});
			colorConsole.gray('<response>');
			colorConsole.gray({ awaitUsers });
			return res.status(200).json({ status: 200, message: '승인대기 유저 조회에 성공하였습니다.', data: { awaitUsers } });
		}
	} catch (err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status: 500, message: '승인대기 유저 조회에 실패하였습니다.' });
	}
}

exports.allowUser = async (req, res) => {
	colorConsole.green('[channelAdmin] 승인대기 유저 승인');
	const { user } = req;
	const { channel_id, user_id } = req.query; //querystring ( channel_id : request channel, user_id : allow user id)

	colorConsole.gray('<request>');
	colorConsole.gray({ channel_id, user_id });

	if (!(channel_id && user_id)) {
		colorConsole.yellow('검증 오류입니다.');
		return res.status(400).json({ status: 400, message: '검증 오류입니다' });
	}

	try {
		if (!await models.Channel.isFounder(user.user_id, channel_id)) {
			colorConsole.yellow('[channelAdmin] 승인 권한이 없습니다.');
			return res.status(403).json({ status: 403, message: '승인 권한이 없습니다.' });
		}

		await models.ChannelUser.allowUser(user_id, channel_id);

		return res.status(200).json({ status: 200, message: '채널 승인이 완료되었습니다.' });
	} catch (err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status: 500, message: '채널 승인에 실패하였습니다.' });
	}
}

exports.rejectUser = async (req, res) => {
	colorConsole('[channelAdmin] 승인대기 유저 거절');
	const { user } = req;
	const { channel_id, user_id } = req.query; //querystring (channel_id : request channel, user_id : reject user id)

	colorConsole.gray('<request>');
	colorConsole.gray({ channel_id, user_id });

	if (!(channel_id && user_id)) {
		colorConsole.yellow('검증 오류입니다.');
		return res.status(400).json({ status: 400, message: '검증 오류입니다' });
	}

	try {
		if (!await models.Channel.isFounder(user.user_id, channel_id)) {
			colorConsole.yellow('[channelAdmin] 거절 권한이 없습니다.');
			return res.status(403).json({ status: 403, message: '거절 권한이 없습니다.' });
		}

		await models.ChannelUser.rejectUser(user_id, channel_id);

		return res.status(200).json({ status: 200, message: '채널 거절이 완료되었습니다.' });
	} catch (err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status: 500, message: '채널 거절에 실패하였습니다.' });
	}
}

exports.updateChannel = async (req, res) => {
	colorConsole.green('[channel] 채널 정보 변경');
	const { user, body } = req;
	const { channel_id } = req.query; //querystirng (channel_id : update channel id)

	colorConsole.gray('<request>');
	colorConsole.gray({ channel_id, body });

	try {
		if (!channel_id) {
			throw err;
		}
		await Validation.validateUpdateChannel(body);
	} catch (err) {
		return res.status(400).json({ status: 400, message: '검증 오류입니다.' });
	}

	try {
		const channel = await models.Channel.getChannel(channel_id);

		if (!channel) {
			colorConsole.yellow('[channel] 채널 정보가 존재하지 않습니다.');
			return res.status(404).json({ status: 404, message: '채널 정보가 존재하지 않습니다.' });
		}

		if (channel.create_user !== user.user_id) {
			colorConsole.yellow('[channel] 변경 권한이 없습니다.');
			return res.status(403).json({ status: 403, message: '변경 권한이 없습니다.' });
		}

		models.Channel.updateChannel(channel_id, body);
		return res.status(200).json({ status: 200, message: '채널 변경에 성공하였습니다.' });
	} catch (err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status: 500, message: '채널 변경에 실패하였습니다.' });
	}
}

exports.forcedExit = async (req, res) => {
	colorConsole.green('[channelAdmin] 유저 강제퇴장');
	const { user } = req;
	const { channel_id, user_id } = req.query;

	if (!(channel_id && user_id)) {
		colorConsole.yellow('검증 오류입니다.');
		return res.status(400).json({ status: 400, message: '검증 오류입니다' });
	}
	if (user_id === user.user_id) {
		colorConsole.yellow('[channelAdmin]]강제퇴장이 불가능한 유저입니다.');
		return res.status(403).json({ status: 403, message: '강제퇴장이 불가능한 유저입니다.' });
	}
	colorConsole.gray('<reqeust>');
	colorConsole.gray({ channel_id, user_id });

	try {
		if (!await models.Channel.isFounder(user.user_id, channel_id)) {
			colorConsole.yellow('[channelAdmin] 거절 권한이 없습니다.');
			return res.status(403).json({ status: 403, message: '거절 권한이 없습니다.' });
		}

		await models.ChannelUser.deleteChannelUser(user_id, channel_id);

		return res.status(200).json({ status: 200, message: '채널 강제퇴장에 완료되었습니다.' });
	} catch (err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status: 500, message: '채널 강제퇴장에 실패하였습니다.' });
	}
}