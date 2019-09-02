const User = require("../../models/models").User;

module.exports = async function(req, res) {
	const user = req.user;
	
	try {
		await User.update({ profile_pic : req.file.filename }, { where : { user_id : user.user_id } });

		console.log("프로필 사진이 업로드 되었습니다 file name : " + req.file.filename);
		return res.status(200).json({status : 200, message : "프로필 사진이 업로드되었습니다"})
	} catch(err) {
		console.log("프로필 사진 업로드중 오류가 발생하였습니다\n" + err);
		return res.status(500).json({status : 500, message : "프로필 사진 업로드중 오류가 발생하였습니다"})
	}
	
}