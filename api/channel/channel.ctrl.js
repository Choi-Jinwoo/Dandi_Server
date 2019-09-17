const models = require("../../models");
const colorConsole = require("../../lib/console");
const Validation = require('../../lib/validation');
const getThumbnailUrl = require("../image/getThumbnailUrl");

exports.addChannel = async (req, res) => {
	colorConsole.green("[channel] 채널 추가");
	const user = req.user;    
	const { body } = req;
	body.school_id = user.school_id;
	let createdChannel;

	colorConsole.gray("<request>");
	colorConsole.gray({ body });

	try {
		Validation.validateAddChannel(body);
	} catch(err) {
		colorConsole.yellow("검증 오류입니다.");
		return res.status(400).json({ status : 400, message : "검증 오류입니다" });
	}

	try {
		const channelExist = await models.Channel.getChannelForCreate(body.school_id, body.name);
		
		if (channelExist) {
			colorConsole.yellow("[channel] 이미 채널이 존재합니다.");
			return res.status(400).json({ status : 400, message : "이미 채널이 존재합니다." });
		}

		createdChannel = await models.Channel.createChannel(body);
	} catch(err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status : 500, message : "채널 개설에 실패하였습니다." });
	}

	try {
		await models.ChannelUser.createChannel({
			user_id : user.user_id,
			channel_id : created_channel.id,
			isAllowed : true,
			pushNotify : false,
		});

		return res.status(200).json({ status : 200, message : "채널 개설에 성공하였습니다.", data : { channel_id : created_channel.id } });
	} catch(err) {
		try {
			await models.Channel.deleteChannel(createdChannel.id);
			colorConsole.red(err.message);
			return res.status(500).json({ status : 500, message : "채널 개설에 실패하였습니다." });
		} catch(err) {
			colorConsole.red(err.message);
			return res.status(500).json({ status : 500, message : "채널 개설에 실패하였습니다." });
		}
	}
}

exports.deleteChannel = async (req, res) => {
	colorConsole.green("[channel] 채널 삭제");
	const user = req.user;
	const { channel_id } = req.query; //querystring (channel_id : delete channel id)
	
	colorConsole.gray("<request>");
	colorConsole.gray({ channel_id });

	if (!channel_id) {
		colorConsole.yellow("검증 오류입니다.");
		return res.status(400).json({ status : 400, message : "검증 오류입니다." });
	}

	try {
		const channel = await models.Channel.getChannel(channel_id);
		
		if (!channel) {
			colorConsole.yellow("[channel] 채널 정보가 존재하지 않습니다.");
			return res.status(400).json({ status : 400, message : "채널 정보가 존재하지 않습니다." });
		}
		
		if (channel.create_user !== user.user_id) {
			colorConsole.yellow("[channel] 삭제 권한이 없습니다.");
			return res.status(403).json({ status : 403, message : "삭제 권한이 없습니다."});
		}

		await models.ChannelUser.deleteChannelUserByChannel(channel_id);
		await models.Channel.deleteChannel(channel_id);

		return res.status(200).json({ status : 200, message : "채널 삭제에 성공하였습니다." });
	} catch (err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status : 500, message : "채널 삭제에 실패하였습니다." });
	}
}

exports.joinChannel = async (req, res) => {
	colorConsole.green("[channel] 채널 가입");
	const user = req.user;
	const { channel_id } = req.query; //querystring (channel_id : join channel id)
	
	colorConsole.gray("<request>");
	colorConsole.gray({ channel_id });

	if (!channel_id) {
		colorConsole.yellow("검증 오류입니다.");
		return res.status(400).json({ status : 400, message : "검증 오류입니다" });
	}

	try{
		const channelUser = await models.ChannelUser.isMember(user.user_id, channel_id);
		
		if (channelUser) {
			colorConsole.yellow("[channel] 이미 가입된 채널입니다.");
			return res.status(400).json({ status : 400, message : "이미 가입된 채널입니다." });
		}
	
		const channel = await models.Channel.getChannel(channel_id);
		const channelPublic = channel.isPublic;
		
		await models.ChannelUser.createChannelUser({
			user_id : user.user_id,
			channel_id,
			isAllowed : channelPublic,
			pushNotify: user.pushNotify,
		});

		return res.status(200).json({ status : 200, message : "채널 가입에 성공하였습니다." });
	} catch(err) {
			colorConsole.red(err.message);
			return res.status(500).json({ status : 500, message : "채널 가입에 실패하였습니다." });
	}
}

exports.leaveChannel = async (req, res) => {
	colorConsole.green("[channel] 채널 탈퇴");
	const user = req.user;
	const { channel_id } = req.query; //querystring (channel_id : leave channel id)
	
	colorConsole.gray("<request>");
	colorConsole.gray({ channel_id });

	if (!channel_id) {
		colorConsole.yellow("검증 오류입니다.");
		return res.status(400).json({ status : 400, message : "검증 오류입니다" });
	}

	try {
		const channel = await models.Channel.getChannel(channel_id);

		if (channel.create_user === user.user_id) {
			colorConsole.yellow("[channel] 탈퇴가 불가능한 유저입니다.");
			return res.status(400).json( {status : 400, message : "탈퇴가 불가능한 유저입니다." });
		}

		const deleteUser = await models.ChannelUser.leaveChannel(user.user_id, channel_id);

		if (!deleteUser) {
			colorConsole.yellow("[channel] 가입정보가 존재하지 않습니다.");
			return res.status(400).json({ status : 400, message : "가입정보가 존재하지 않습니다." });
		}
		
		return res.status(200).json({ status : 200, message : "채널 탈퇴에 성공하였습니다." });
	} catch(err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status : 500, message : "채널 탈퇴에 실패하였습니다" });
	}
}

exports.