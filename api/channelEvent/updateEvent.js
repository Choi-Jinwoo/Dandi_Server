const ChannelEvent = require("../../models/models").ChannelEvent;
const isMember = require("../channelEvent/isMember");
const getChannelId = require("../channelEvent/getChannelId");

module.exports = async function (req, res) {
    const user = req.user;
    
    const req_event_id = req.body.id; //event id
    const req_title = req.body.title;
    const req_start_date = req.body.start_date;
    const req_end_date = req.body.end_date;
    const req_author = user.user_id; //현재 유저의 id
    
    try {
        const req_channel_id = await getChannelId(req_event_id);
        
        if (!await isMember(user.user_id, req_channel_id)) { //멤버가 아니라면
            console.log("일정을 변경할 권한이 없습니다 id : " + user.user_id);
            return res.status(403).json({status : 403, message : "일정을 변경할 권한이 없습니다"});
        }

        await ChannelEvent.update({ //이벤트 업데이트
            id : req_event_id,
            channel_id : req_channel_id,
            title : req_title,
            start_date : req_start_date,
            end_date : req_end_date,
            author : req_author
        }, {where : { id : req_event_id }}); 
            

        console.log("일정 변경에 성공하였습니다 id : " + user.user_id);
        return res.status(200).json({status : 200, message : "일정 변경에 성공하였습니다"});
    } catch(err) {
        console.log("일정 변경중 오류가 발생하였습니다\n" + err);
        return res.status(500).json({status : 500, message : "일정 변경중 오류가 발생하였습니다"})
    }
}