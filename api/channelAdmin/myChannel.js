const Channel = require("../../models/models").Channel;

module.exports =  async function(req, res) {
    const user = req.user;
    
    try {
        const myChannel = await Channel.findAll({
            where : { create_user : user.user_id }
        })

        if (myChannel.length === 0) { //개설한 채널이 없을경우
            console.log("개설한 채널이 없습니다 id : " + user.user_id);
            return res.status(400).json({status : 400, message : "개설한 채널이 없습니다"});
        }

        console.log("개설한 채널을 조회하였습니다 id : " + user.user_id);
        return res.status(200).json({status : 200, message : "개설한 채널을 조회하였습니다", data : { myChannel }});
    } catch (err) {
        console.log("개설한 채널 조회중 오류가 발생하였습니다\n" + err);
        return res.status(500).json({status : 500, message : "개설한 채널 조회중 오류가 발생하였습니다"});
    }
    
}