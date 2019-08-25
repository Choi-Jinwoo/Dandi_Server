const ChannelEvent = require("../../models/models").ChannelEvent;
const isMember = require("../../api/channelEvent/isMember");

module.exports = async function (req, res) {
    const user = req.user;
    const req_channel_id = req.query.channel_id;

    try {
        if (!await isMember(user.user_id, req_channel_id)) { //멤버가 아니라면
            console.log("일정을 조회할 권한이 없습니다 id : " + user.user_id);
            return res.status(403).json({status : 403, message : "일정을 조회할 권한이 없습니다"});
        }

        const channelEvent = await ChannelEvent.findAll({
            where : { channel_id : req_channel_id }
        });

        console.log("일정을 조회하였습니다 id : " + user.user_id);
        return res.status(200).json({status : 200, message : "일정을 조회하였습니다", data : { channelEvent }});
    } catch(err) {
        console.log("일정을 조회하는 중 오류가 발생하였습니다\n" + err);
        return res.status(500).json({status : 500, message : "일정을 조회하는 중 오류가 발생하였습니다"});
    }
    
}