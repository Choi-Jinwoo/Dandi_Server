const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
			cb(null, './public/image/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
	},
	filename: function (req, file, cb) {

			cb(null, Date.now() + file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
	}
})

module.exports = multer({ storage: storage });