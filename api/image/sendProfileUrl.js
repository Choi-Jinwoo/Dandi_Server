const User = require("../../models/models").User;

module.exports = async function(req, res) {
	const { user_id } = req.query

	try {
		const userPicData = await User.findOne({
			attributes : [ "profile_pic" ],
			where : {user_id : user_id}
		});
		const profile_pic = userPicData.profile_pic;
		
		if (profile_pic === null || profile_pic === undefined) { //기본 프로필 사진
			const picture_url = `${req.origin}/static/image/basic_profile.png`; //basic_profile.png
			console.log("기본 프로필 사진 url을 전송하였습니다");
			return res.status(200).json({status : 200, message : "기본 프로필 사진url을 전송하였습니다", data : { url : picture_url }});
		}
		const picture_url = `${req.origin}/static/image/${profile_pic}`;

		console.log("프로필 사진 url을 전송하였습니다");
		return res.status(200).json({status : 200, message : "프로필 사진url을 전송하였습니다", data : { url : picture_url }});
	} catch(err) {
		console.log("프로필 사진 url 전송중 오류가 발생하였습니다\n" + err);
		return res.status(500).json({status : 500, message : "프로필 사진url 전송중 오류가 발생하였습니다"});
	}
}