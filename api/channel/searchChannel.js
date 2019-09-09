const models = require("../../models/models");
const colorConsole = require("../../lib/console");
const getThumbnailUrl = require("../image/getThumbnailUrl");

module.exports = async (req, res) => {
    colorConsole.green("[channel] 채널 검색");
    const user = req.user;
    const { channel_name } = req.query; //querystring (channel_name : search channel name)

    colorConsole.gray("request");
    colorConsole.gray({ channel_name });

    if (!channel_name) { //search All school channel
        try {
            const channels = await models.Channel.findAll({ where : { school_id : user.school }, raw : true});
            
            if (!channels.length) {
                colorConsole.yellow("[channel] 채널 정보가 존재하지 않습니다.");
                return res.status(400).json({ status : 400, message : "채널 정보가 존재하지 않습니다."});
            }
            
            for (let i = 0; i < channels.length; i++) {
                channels[i].thumbnail = await getThumbnailUrl(req, channels[i].channel_id);
            }

            colorConsole.gray("response");
            colorConsole.gray({ channels });

            return res.status(200).json({ status : 200, message : "채널 조회에 성공하였습니다.", data : { channels } });
        } catch(err) {
            colorConsole.red(err.message);
            return res.status(500).json({ status : 500, message : "채널 조회에 실패하였습니다." });
        }
    }

    try { //search channel_name
        channel = await models.Channel.findOne({ where : { name : channel_name, school_id : user.school }, raw : true })

        if (!channel) {
            colorConsole.yellow("[channel] 채널 정보가 존재하지 않습니다.");
            return res.status(400).json({ status : 400, message : "채널 정보가 존재하지 않습니다." });
        }
        
        channel.thumbnail = await getThumbnailUrl(req, channel.id);
        
        colorConsole.gray("response");
        colorConsole.gray({ channel });
        
        return res.status(200).json({ status : 200, message : "채널 조회에 성공하였습니다.", data : { channel }});    
    } catch(err) {
        colorConsole.red(err.message);
        return res.status(500).json({ status : 500, message : "채널 조회에 실패하였습니다." });
    }
}