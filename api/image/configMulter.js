const multer = require("multer");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
			cb(null, './public/image/')
	},
	filename: (req, file, cb) => {
			cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
	}
})

module.exports = multer({ storage });