const models = require('../../models');
const colorConsole = require('../../lib/console');
const Validation = require('../../lib/validation');
const { getThumbnailUrl } = require('../image/image.ctrl');

exports.getChannelEvent = async (req, res) => {
	colorConsole.green('[channelEvent] 일정 조회');
	const { user } = req;
	const { channel_id } = req.query; //querystring (channel_id : get events channel)
	
	colorConsole.gray('<request>');
	colorConsole.gray({ channel_id });

	if (!channel_id) {
		colorConsole.yellow('검증 오류입니다.');
		return res.status(400).json({ status : 400, message : '검증 오류입니다.' });
	}

	try {
		if (!await models.ChannelUser.isMember(user.user_id, channel_id)) {
			colorConsole.yellow('[channelEvent] 일정 조회 권한이 없습니다.')
			return res.status(403).json({ status : 403, message : '일정 조회 권한이 없습니다.' });
		}
		
		const events = await models.ChannelEvent.getEventByChannel(channel_id);
		
		for (let i = 0; i < events.length; i++) {
			const userInfo = await models.User.getUser(events[i].author);
			const channelInfo = await models.Channel.getChannel(events[i].channel_id);
			channelInfo.thumbnail = await getThumbnailUrl(req, events[i].channel_id);
			
			events[i].channel = channelInfo;
			events[i].author = {
				user_id : userInfo.user_id,
				user_name : userInfo.user_name,
			}
		}

		colorConsole.gray('<response>');
		colorConsole.gray({ events });

		return res.status(200).json({ status : 200, message : '일정 조회에 성공하였습니다.', data : { events } });
	} catch(err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status : 500, message : '일정 조회에 실패하였습니다.' });
	}
}

exports.addEvent = async (req, res) => {
	colorConsole.green('[channelEvent] 일정 추가');
	const { user } = req;
	const { channel_id } = req.query; //querystring(channel_id : event channel_id)
	const { body } = req;

	body.author = user.user_id;
	body.channel_id = channel_id;
	
	colorConsole.gray('<request>');
	colorConsole.gray({ body });

	try {
		if (!channel_id) {
			throw err;
		}

		await Validation.validateAddEvent(body);
	} catch(err) {
		colorConsole.yellow('검증 오류입니다.');
		return res.status(400).json({ status : 400, message : '검증 오류입니다.' });
	}

	try {
		if (!await models.ChannelUser.isMember(user.user_id, channel_id)) {
			colorConsole.yellow('[channelEvent] 일정 추가 권한이 없습니다.');
			return res.status(403).json({ status : 403, message : '일정 추가 권한이 없습니다.' });
		}
		
		await models.ChannelEvent.createEvent(body);
		return res.status(200).json({ status : 200, message : '일정 추가에 성공하였습니다.' });
	} catch(err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status : 500, message : '일정 추가에 실패하였습니다.' });
	}
}

exports.deleteEvent = async (req, res) => {
	colorConsole.green('[channelEvent] 일정 삭제')
	const { user } = req;
	const { event_id }  = req.query; //querystring (event_id : delete event_id)
	
	colorConsole.gray('<request>');
	colorConsole.gray({ event_id });

	if (!event_id) {
		colorConsole.yellow('검증 오류입니다.');
		return res.status(400).json({ status : 400, message : '검증 오류입니다.' });
	}

	try {
		const { channel_id } = await models.ChannelEvent.getEvent(event_id);
		
		if (!channel_id) {
			colorConsole.red('채널이 존재하지 않는 이벤트입니다.');
			return res.status(500).json({ status : 500, message : '일정 삭제에 실패하였습니다.' });
		}

		if (!await models.ChannelUser.isMember(user.user_id, channel_id)) {
			colorConsole.yellow('[channelEvent] 일정 삭제 권한이 없습니다.')
			return res.status(403).json({ status : 403, message : '일정 삭제 권한이 없습니다.' });
		}

		await models.ChannelEvent.deleteEvent(event_id);

		return res.status(200).json({ status : 200, message : '일정 삭제에 성공하였습니다.' });
	} catch(err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status : 500, message : '일정 삭제에 실패하였습니다.' });
	}
}

exports.searchEvent = async (req, res) => {
	colorConsole.green('[channelEvent] 일정 검색')
	const { user } = req;
	const { channel_id, keyword } = req.query //querystring (channel_id : search channel_id, keyword : search keyword)
	
	colorConsole.gray('<request>');
	colorConsole.gray({ channel_id, keyword });

	if (!(channel_id && keyword)) {
		colorConsole.yellow('검증 오류입니다.');
		return res.status(400).json({ status : 400, message : '검증 오류입니다' });
	}

	try {
		if (!await models.ChannelUser.isMember(user.user_id, channel_id)) {
			colorConsole.yellow('[channelEvent] 일정 검색 권한이 없습니다.')
			return res.status(403).json({ status : 403, message : '일정 검색 권한이 없습니다.' });
		}

		const events = await models.ChannelEvent.getEventByChannelAndKeyword(channel_id, keyword);

		if (!events.length) {
			colorConsole.yellow('[channelEvent] 검색 결과가 존재하지 않습니다.');
			return res.status(400).json({ status : 400, message : '검색 결과가 존재하지 않습니다.' });
		}

		for (let i = 0; i < events.length; i++) {
			const userInfo = await models.User.getUser(events[i].author);
			const channelInfo = await models.Channel.getChannel(events[i].channel_id);
			channelInfo.thumbnail = await getThumbnailUrl(req, events[i].channel_id);

			events[i].channel = channelInfo;
			events[i].author = {
				user_id : userInfo.user_id,
				user_name : userInfo.user_name,
			}
		}
		
		colorConsole.gray('<response>');
		colorConsole.gray({ events });
		
		return res.status(200).json({ status : 200, message : '일정 검색에 성공하였습니다.' , data : { events } });
	} catch(err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status : 500, message : '일정 검색에 실패하였습니다.' });
	}
}

exports.updateEvent = async (req, res) => {
	colorConsole.green('[channelEvent] 일정 변경');
	const { user } = req;
	const { event_id } = req.query; //querystirng(event_id : update event id)
	const { body } = req;
	body.author = user.user_id;
	
	colorConsole.gray('<request>');
	colorConsole.gray({ event_id, body });

	try {
		if (!event_id) {
			colorConsole.yellow('검증 오류입니다.');
			return res.status(400).json({ status : 400, message : '검증 오류입니다.' });
		}
		await Validation.validateUpdateEvent(body);	
	} catch(err) {
		colorConsole.yellow('검증 오류입니다.');
		return res.status(400).json({ status : 400, message : '검증 오류입니다.' });
	}

	try {
		const { channel_id } = await models.ChannelEvent.getEvent(event_id);
		
		if (!await models.ChannelUser.isMember(user.user_id, channel_id)) {
			colorConsole.yellow('[channelEvent] 일정 변경 권한이 없습니다.');
			return res.status(403).json({ status : 403, message : '일정 변경 권한이 없습니다.' });
		}
		
		await models.ChannelEvent.updateEvent(event_id, body);
		return res.status(200).json({ status : 200, message : '일정 변경에 성공하였습니다.' });
	} catch(err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status : 500, message : '일정 변경에 실패하였습니다.' });
	}
}