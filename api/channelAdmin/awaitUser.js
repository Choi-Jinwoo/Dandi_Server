const ChannelUser = require("../../models/models").ChannelUser;
const isFounder = require("./isFounder");

module.exports = async function(req, res) {
    const user = req.user;
    const channel_id = req.query.channel_id; //querystring으로 채널아이디를 받아옴

    try {
        if (!await isFounder(user.user_id, channel_id)) { //권한이 없다면
            console.log("채널 승인 대기자 조회에 대한 권한이 없습니다 id : " + user.user_id);
            return res.status(403).json({status : 403, message : "채널 승인 대기자 조회에 대한 권한이 없습니다"});
        }
        
        const awaitUser = await ChannelUser.findAll({
            where : { channel_id : channel_id, isAllowed : false } //승인되지 않은 유저를 검색
        })
        
        if (awaitUser.length === 0) { //대기자가 없을경우
            console.log("채널 승인 대기자가 없습니다 id : " + user.user_id);
            return res.status(400).json({status : 400, message : "채널 승인 대기자가 없습니다"});
        } else {
            console.log("채널 승인 대기자 조회에 성공하였습니다 id : " + user.user_id);
            return res.status(200).json({status : 200, message : "채널 승인 대기자를 조회하였습니다", data : { awaitUser }})
        }

    } catch(err) {
        console.log("채널 승인 대기자 조회중 오류가 발생하였습니다\n" + err);
        return res.status(500).json({status : 500, message : "채널 승인 대기자 조회중 오류가 발생하였습니다"});
    }
    
}