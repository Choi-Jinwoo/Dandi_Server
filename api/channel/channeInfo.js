const models = require("../../models/models");
const colorConsole = require("../../lib/console");
const getThumbnailUrl = require("../image/getThumbnailUrl");

module.exports = async (req, res) => {
    colorConsole.green("[channel] 채널 정보");
    const { channel_id } = req.query; //querystring (channel_id : search channel id)

		colorConsole.gray("request");
    colorConsole.gray({ channel_id });

		if (!channel_id) {
			colorConsole("[channel] 검증 오류입니다.");
			return res.status(400).json({ status : 400, message : "검증 오류입니다." });
		}
		
    try {
			channelInfo = await models.Channel.findOne({ where : { id : channel_id }, raw : true })

			if (!channelInfo) {
				colorConsole.yellow("[channel] 채널 정보가 존재하지 않습니다.");
				return res.status(400).json({ status : 400, message : "[channel] 채널 정보가 존재하지 않습니다." });
			}
			
			channelInfo.thumbnail = await getThumbnailUrl(req, channel_id);

			colorConsole.gray("response");
			colorConsole.gray({ channelInfo });
			return res.status(200).json({ status : 200, message : "채널 정보 조회에 성공하였습니다.", data : { channelInfo }}); 
    } catch(err) {
			colorConsole.red(err.message);
			return res.status(500).json({ status : 500, message : "채널 정보 조회에 실패하였습니다." });
    }
}