const models = require("../../models/models");
const colorConsole = require("../../lib/console");

module.exports = async (req, res) => {
    colorConsole.green("[channel] 채널 검색");
    const user = req.user;
    
    const { channel_name } = req.query; //querystring (channel_name : search channel name)

    if (!channel_name) { //search All school channel
        try {
            const channels = await models.Channel.findAll({ where : { school_id : user.school }});
            
            if (!channels.length) {
                colorConsole.yellow("[channel] 채널 정보가 존재하지 않습니다.");
                colorConsole.gray(user.school);
                return res.status(400).json({ status : 400, message : "채널 정보가 존재하지 않습니다."});
            }
            
            return res.status(200).json({ status : 200, message : "채널 조회에 성공하였습니다.", data : { channels } });
        } catch(err) {
            colorConsole.gray(err.message);
            return res.status(500).json({ status : 500, message : "채널 조회에 실패하였습니다." });
        }
    }

    try { //search channel_name
        channel = await models.Channel.findOne({ where : { name : channel_name, school_id : user.school } })

        if (!channel) {
            colorConsole.yellow("[channel] 채널 정보가 존재하지 않습니다.");
            return res.status(400).json({ status : 400, message : "채널 정보가 존재하지 않습니다." });
        }
        
        return res.status(200).json({ status : 200, message : "채널 조회에 성공하였습니다.", data : { channel }});    
    } catch(err) {
        colorConsole.gray(err.message);
        return res.status(500).json({ status : 500, message : "채널 조회에 실패하였습니다." });
    }
}