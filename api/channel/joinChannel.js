const ChannelUser = require("../../models/models").ChannelUser;
const Channel = require("../../models/models").Channel;

module.exports = async function (req, res) {
    const user = req.user;
    const req_channel_id = req.query.channel_id; //querystring으로 channel_id를 받아옴
    let channel_allwed = 0;

    try{
        const result = await ChannelUser.findOne({ //이미 가입 되있는지 확인
            where : { user_id : user.user_id, channel_id : req_channel_id }
        })
        
        if (!(result === null || result === undefined)) { //중복가입됨
            console.log("채널 중복 가입요청 id : " + user.user_id);
            return res.status(400).json({ status : 400, message : "이미 가입된 채널입니다" });
        }

        
        const channel = await Channel.findOne({ //채널이 공개인지 아닌지 판단
            where : { id : req_channel_id }
        })

        if (channel.isPublic) {
            channel_allwed = 1;
        } else {
            channel_allwed = 0;
        }
        
        await ChannelUser.create({
            user_id: user.user_id,
            channel_id: req_channel_id,
            isAllowed: channel_allwed, //승인 공개여부에 따라 설정
            pushNotify: 0, 
        })

        console.log(`${req_channel_id} 채널 가입에 성공하였습니다 ${user.user_id}`);
        return res.status(200).json({status : 200, message : "채널에 가입하였습니다"});
    } catch(err) {
        console.log("채널에 가입중 오류가 발생하였습니다\n" + err);
        return res.status(500).json({status : 500, message : "채널가입중 오류가 발생하였습니다"});
        
    }
}