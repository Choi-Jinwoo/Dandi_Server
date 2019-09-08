const models = require("../../models/models");
const colorConsole = require("../../lib/console");

module.exports =  async (req, res) => {
    colorConsole.green("[channelAdmin] 개설 채널 조회");
    const user = req.user;
    try {
        const createChannels = await models.Channel.findAll({ where : { create_user : user.user_id }, raw : true });
        
        if (!createChannels.length) {
            colorConsole.yellow("[channelAdmin] 개설 채널이 존재하지 않습니다.");
            return res.status(400).json({ status : 400, message : "개설 채널이 존재하지 않습니다." });
        }

        colorConsole.gray("response");
        colorConsole.gray({ createChannels });

        return res.status(200).json({ status : 200, message : "개설 채널 조회에 성공하였습니다.", data : { createChannels } });
    } catch (err) {
        colorConsole.red(err.message);
        return res.status(500).json({ status : 500, message : "개설 채널 조회에 실패하였습니다." });
    }
    
}