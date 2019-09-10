const models = require("../../models/models");
const colorConsole = require("../../lib/console");

module.exports = async (req, channel_id) => {
	try {
		const thumbnail = await models.Channel.findOne({ attributes : [ "thumbnail" ], where : { id : channel_id } });
		
		let thumbnailUrl;
		if (!thumbnail.thumbnail) {
			thumbnailUrl = `${req.origin}/static/image/thumbnail_basic.jpg`;
		} else {
			thumbnailUrl = `${req.origin}/static/image/${thumbnail.thumbnail}`;
		}

		return thumbnailUrl;
	} catch(err) {
		throw err;
	}
}