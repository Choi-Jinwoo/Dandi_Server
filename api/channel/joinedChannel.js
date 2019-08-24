const ChannelUser = require("../../models/models").ChannelUser;

module.exports = async function (req, res) {
    const user = req.user;

    try {
        const joinedChannel = await ChannelUser.findAll({
            where : { user_id : user.user_id }
        })
    
        if (joinedChannel.length === 0) { //가입된 채널이 있는지 확인
            console.log("가입된 채널이 없습니다 id : " + user.user_id);
            return res.status(400).json({status : 400, message : "가입된 채널이 없습니다"});
        }

        console.log("가입된 채널을 조회하였습니다 id : " + user.user_id);
        return res.status(200).json({status : 200, message : "가입된 채널을 조회하였습니다", data : {joinedChannel}});
    } catch(err) {
        console.log("가입된 채널을 조회중 오류가 발생하였습니다\n" + err);
        return res.status(500).json({status : 500, message : "가입된 채널을 조회중 오류가 발생하였습니다"});
    }
    
}