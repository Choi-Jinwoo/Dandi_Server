const ChannelUser = require("../../models/models").ChannelUser;
const Channel = require("../../models/models").Channel;

module.exports = async function(req, res) {
    const user = req.user;
    const req_channel_id = req.query.channel_id; //querystring으로 channel_id를 받아옴
    
    try {
        const userData = await ChannelUser.findOne({
            where : { user_id : user.user_id, channel_id : req_channel_id }
        })
    
        if (userData === null || userData === undefined) { //가입되지 않음
            console.log("가입되지 않은 채널 탈퇴요청 id : " + user.user_id);
            return res.status(400).json({ status : 400, message : "가입되지 않은 채널입니다" });
        }

        await ChannelUser.destroy({
            where : { user_id : user.user_id, channel_id : req_channel_id } 
        })

        console.log(`${req_channel_id} 채널 탈퇴에 성공하였습니다 ${user.user_id}`);
        return res.status(200).json({status : 200, message : "채널에 탈퇴하였습니다"});
    } catch(err) {
        console.log("채널 탈퇴중 오류가 발생하였습니다\n" + err);
        return res.status(500).json({ status : 500, message : "채널 탈퇴중 오류가 발생하였습니다" });
    }
}