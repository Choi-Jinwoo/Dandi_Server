const ChannelEvent = require("../../models/models").ChannelEvent;
const isMember = require("../channelEvent/isMember");
const getChannelId = require("../channelEvent/getChannelId");

module.exports = async function (req, res) {
    const user = req.user;
    
    const req_event_id = req.query.id; //querystring으로 event_id를 받아옴
    
    try {
        const req_channel_id = await getChannelId(req_event_id);
        
        if (!await isMember(user.user_id, req_channel_id)) { //멤버가 아니라면
            console.log("일정을 삭제할 권한이 없습니다 id : " + user.user_id);
            return res.status(403).json({status : 403, message : "일정을 삭제할 권한이 없습니다"});
        }

        await ChannelEvent.destroy({
            where : { id : req_id }
        })

        console.log("일정 삭제에 성공하였습니다 id : " + user.user_id);
        return res.status(200).json({status : 200, message : "일정 삭제에 성공하였습니다"});
    } catch(err) {
        console.log("일정 삭제중 오류가 발생하였습니다\n" + err);
        return res.status(500).json({status : 500, message : "일정 삭제중 오류가 발생하였습니다"})
    }
}