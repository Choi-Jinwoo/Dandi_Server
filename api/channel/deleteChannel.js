const Channel = require("../../models/models").Channel;
const ChannelUser = require("../../models/models").ChannelUser;

module.exports = async function (req,res) {
    const user = req.user;
    const req_channel_id = req.query.channel_id; //qeurystring으로 채널 아이디를 가지고옴

    try {
        const channel = await Channel.findOne({wher : {id : req_channel_id}});
        
        if (channel === null || channel === undefined) { //채널 존재 여부확인
            console.log("삭제할 채널에 대한 정보가 없습니다 channel_id : " + req_channel_id);
            return res.status(400).json({status : 400, message : "삭제할 채널에 대한 정보가 없습니다"});
        } else {
            console.log("삭제할 채널이 조회되었습니다 channel_id : " + req_channel_id);
            if(channel.create_user !== user.user_id) { //권한 확인
                console.log("삭제할 권한이 없습니다 id : " + user.user_id);
                return res.status(401).json({status : 401, message : "채널을 삭제할 권한이 없습니다"});
            }

            const destroyedChannel = await Channel.destroy({ where : {id : req_channel_id} });

            if (destroyedChannel === 0) {
                console.log("삭제할 채널에 대한 정보가 없습니다 channel_id : " + req_channel_id);
                return res.status(400).json({status : 400, message : "삭제할 채널에 대한 정보가 없습니다"});
            }

            console.log("채널이 삭제되었습니다 channel_id : " + req_channel_id);
            return res.status(200).json({status : 200, message : "채널삭제에 성공하였습니다"});
        }
    } catch (error) {
        console.log("채널을 삭제중 오류가 발생하였습니다\n" + err);
        return res.status(500).json({status : 500, message : "채널을 삭제중 오류가 발생하였습니다"});
    }
}

