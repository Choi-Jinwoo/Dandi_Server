const models = require("../../models/models");
const colorConsole = require("../../lib/console");

module.exports = async (req, res) => {
    colorConsole.green("[channel] 채널 추가");
    const user = req.user;    
    const { name, color, isPublic } = req.body;
    const school_id = user.school;

    if (!name || (isPublic === null || isPublic === undefined)) {
        colorConsole.gray("검증 오류입니다.");
        return res.status(400).json({ status : 400, message : "검증 오류입니다" });
    }

    try {
        const channelExist = await models.Channel.findOne({ where : { name, school_id : school_id } });
        
        if (channelExist) {
            colorConsole.yellow("[channel] 이미 채널이 존재합니다.");
            colorConsole.gray(channelExist.name);
            colorConsole.gray(channelExist.school_id);
            return res.status(400).json({ status : 400, message : "이미 채널이 존재합니다." });
        }

        const created_channel = await models.Channel.create({
            name,
            create_user : user.user_id,
            color,
            school_id,
            isPublic
        });

        await models.ChannelUser.create({
            user_id : user.user_id,
            channel_id : created_channel.id,
            isAllowed : true,
            pushNotify : false,
        });

        return res.status(200).json({ status : 200, message : "채널 개설에 성공하였습니다." });
    } catch(err) {
        try {
            await models.Channel.destroy({ where : { name, school_id } });
            colorConsole.gray(err.message);
            return res.status(500).json({ status : 500, message : "채널 개설에 실패하였습니다." });
        } catch(err) {
            colorConsole.gray(err.message);
            return res.status(500).json({ status : 500, message : "채널 개설에 실패하였습니다." });
        }
    }
}