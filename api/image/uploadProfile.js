const models = require("../../models/models");
const colorConsole = require("../../lib/console");

module.exports = async (req, res) => {
	colorConsole.green("[image] 프로필 이미지 업로드");
	const user = req.user;
	
	colorConsole.gray("request");
	colorConsole.gray({ file : req.file });

	if (!req.file) {
		colorConsole.yellow("검증 오류입니다.");
		return res.status(400).json({ status : 400, message : "검증 오류입니다." });
	}
	
	try {
		await models.User.update({ profile_pic : req.file.filename }, { where : { user_id : user.user_id } });
		return res.status(200).json({ status : 200, message : "프로필 사진 업로드에 성공하였습니다." });
	} catch(err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status : 500, message : "프로필 사진 업로드에 실패하였습니다." });
	}
}