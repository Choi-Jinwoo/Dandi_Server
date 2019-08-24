const ChannelUser = require("../../models/models").ChannelUser;
const isFounder = require("./isFounder");

module.exports = async function (req, res) {
    const user = req.user;
    const req_channel_id = req.query.channel_id; //querystring으로 channe_id를 받아옴
    const req_user_id = req.query.user_id; //querystring으로 user_id를 받아옴
    try {
        if (!await isFounder(user.user_id, req_channel_id)) { //개설자인지 확인
            console.log("채널유저 승인에 대한 권한이 없습니다 id : " + user.user_id);
            return res.status(403).json({status : 403, message : "채널유저 승인에 대한 권한이 없습니다"});
        }
        
        const channel_user_info = await ChannelUser.findOne({where : {user_id : req_user_id, channel_id : req_channel_id}}); 
        
        if (channel_user_info === null || channel_user_info === undefined) { //존재하는 신청인지 확인
            console.log("가입신청이 없습니다 : id" + req_user_id);
            return res.status(400).json({status : 400, message : "가입신청이 없습니다"});
        }

        if (channel_user_info.isAllowed) {//승인이 되었는지 확인
            console.log("이미 채널에 승인되었습니다 id : " + req_user_id);
            return res.status(400).json({status : 400, message : "이미 채널에 승인되었습니다"});
        }
        

        await ChannelUser.update({ isAllowed : true }, {where : {user_id : req_user_id, channel_id : req_channel_id }}); //승인

        console.log("채널에 승인되었습니다 id : " + req_user_id);
        return res.status(200).json({status : 200, message : "채널에 승인되었습니다"});
    } catch(err) {
        console.log("채널 승인중 오류가 발생하였습니다\n" + err);
        return res.status(500).json({status : 500, message : "채널 승인중 오류가 발생하였습니다"});
    }
} 