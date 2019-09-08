const models = require("../../models/models");
const colorConsole = require("../../lib/console");

module.exports = async (req, res) => {
	colorConsole.green("[image] 프로필 URL 전송");
	const { user_id } = req.query; //querystring (user_id : user_id profile)

	if (!user_id) { 
		colorConsole.yellow("[image] 검증 오류입니다.");
		return res.status(400).json({ status : 400, message : "검증 오류입니다." });
	}

	try {
		const profilePic = await models.User.findOne({ attributes : [ "profile_pic" ], where : { user_id } });

		if (!profilePic.profile_pic) {
			const profileUrl = `${req.origin}/static/image/basic_profile.png`;
			return res.status(200).json({ status : 200, message : "URL 전송에 성공하였습니다.", data : { profileUrl } });
		}

		const profileUrl = `${req.origin}/static/image/${profilePic.profile_pic}`;
		return res.status(200).json({ status : 200, message : "URL 전송에 성공하였습니다.", data : { profileUrl } });
	} catch(err) {
		colorConsole.gray(err.message);
		return res.status(500).json({ status : 500, message : "URL 전송에 실패하였습니다." });
	}
}