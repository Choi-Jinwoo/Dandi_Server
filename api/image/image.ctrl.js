const models = require('../../models');
const colorConsole = require('../../lib/console');
const imageInfo = require('../../config/imageInfo');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
			cb(null, './public/image/');
	},
	filename: (req, file, cb) => {
			cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
	},
});

const upload = multer({ storage });

exports.uploadProfile = async (req, res) => {
	colorConsole.green('[image] 프로필 이미지 업로드');
	const { user } = req;
	
	try {
		upload.single('profile_pic');
	} catch(err) {
		colorConsole.yellow('검증 오류입니다.');
		return res.status(400).json({ status : 400, message : '검증 오류입니다.' });
	}

	colorConsole.gray('<request>');
	colorConsole.gray({ file : req.file });

	if (!req.file) {
		colorConsole.yellow('검증 오류입니다.');
		return res.status(400).json({ status : 400, message : '검증 오류입니다.' });
	}
	
	try {
		await models.User.updateProfile(user.user_id, req.file.filename);
		return res.status(200).json({ status : 200, message : '프로필 사진 업로드에 성공하였습니다.' });
	} catch(err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status : 500, message : '프로필 사진 업로드에 실패하였습니다.' });
	}
}

exports.uploadThumbnail = async (req, res) => {
	colorConsole.green('[image] 채널 이미지 업로드');
	const { user } = req;
	const { channel_id } = req.query; //querystring(channel_id : upload channel)
	
	colorConsole.gray('<request>');
	colorConsole.gray({ channel_id, file : req.file });

	if (!(req.file && channel_id)) {
		colorConsole.yellow('검증 오류입니다.');
		return res.status(400).json({ status : 400, message : '검증 오류입니다.' });
	}

	try {
		if (!await models.Channel.isFounder(user.user_id, channel_id)) {
			colorConsole.yellow('[image] 채널 이비지 업로드 권한이 없습니다.');
			return res.status(403).json({ status : 403, message : '채널 이비지 업로드 권한이 없습니다.' });
		}

		await models.Channel.updateThumbnail(channel_id, req.file.filename);
		return res.status(200).json({ status : 200, message : '채널 이미지 업로드에 성공하였습니다.' });
	} catch(err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status : 500, message : '채널 이미지 업로드에 실패하였습니다.' });
	}
}

exports.getProfileUrl = async(req, user_id) => {
	try {
		const user = await models.User.getUser(user_id);
		let { profile_pic } = user;
		
		if (!fs.existsSync(path.join(__dirname, `../../public/image/${profile_pic}`))) {
			profile_pic = null;
		};
		
		let profileUrl;
		if (!profile_pic) {
			profileUrl = `${req.origin}/static/image/${imageInfo.basic_profile}`;
		} else {
			profileUrl = `${req.origin}/static/image/${profile_pic}`;
		}

		return profileUrl;
	} catch(err) {
		throw err;
	}
}

exports.getThumbnailUrl = async (req, channel_id) => {
	try {
		let { thumbnail } = await models.Channel.getChannel(channel_id);
		
		if (!fs.existsSync(path.join(__dirname, `../../public/image/${thumbnail}`))) {
			thumbnail = null;
		};
		
		let thumbnailUrl;
		if (!thumbnail) {
			thumbnailUrl = `${req.origin}/static/image/${imageInfo.basic_thumbnail}`;
		} else {
			thumbnailUrl = `${req.origin}/static/image/${thumbnail}`;
		}

		return thumbnailUrl;
	} catch(err) {
		throw err;
	}
}