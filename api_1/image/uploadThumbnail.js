const models = require("../../models");
const colorConsole = require("../../lib/console");
const isFounder = require("../channelAdmin/isFounder");

module.exports = async (req, res) => {
	colorConsole.green("[image] 채널 이미지 업로드");
	const user = req.user;
	const { channel_id } = req.query; //querystring(channel_id : upload channel)
	
	colorConsole.gray("request");
	colorConsole.gray({ channel_id, file : req.file });

	if (!(req.file && channel_id)) {
		colorConsole.yellow("검증 오류입니다.");
		return res.status(400).json({ status : 400, message : "검증 오류입니다." });
	}

	try {
		if (!await isFounder(user.user_id, channel_id)) {
			colorConsole.yellow("[image] 채널 이비지 업로드 권한이 없습니다.");
			return res.status(403).json({ status : 403, message : "채널 이비지 업로드 권한이 없습니다." });
		}

		await models.Channel.update({ thumbnail : req.file.filename }, { where : { id : channel_id } });
		return res.status(200).json({ status : 200, message : "채널 이미지 업로드에 성공하였습니다." });
	} catch(err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status : 500, message : "채널 이미지 업로드에 실패하였습니다." });
	}
}