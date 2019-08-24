const Channel = require("../../models/models").Channel;
const ChannelUser = require("../../models/models").ChannelUser;

module.exports = async function (req, res) {
    const channel_name = req.body.name;
    const channel_color = req.body.color;
    const channel_isPublic = req.body.isPublic;
    const user = req.user;
    const channel_school_id = req.user.school; //유저의 학교 정보를 가져옴
    
    try {
        const channel_exist = await Channel.findOne({where : {name : channel_name, school_id : channel_school_id}});

        if (channel_exist === null || channel_exist === undefined) { //중복된 채널이 없을때
            try {
                const created_channel = await Channel.create({
                    name : channel_name,
                    create_user : user.user_id, //개설자 user_id 작성
                    color : channel_color,
                    school_id : user.school, //개설자 school 작성
                    isPublic : channel_isPublic,
                })
    
                await ChannelUser.create({ //개설자 정보 channeluser에 추가
                    user_id : user.user_id,
                    channel_id : created_channel.id,//현재 만들어지는 채널의 아이디,
                    isAllowed : true, 
                    pushNotify : false, 
                  })

                console.log("채널 개설에 성공하였습니다 channel_id : " + created_channel.id);
                return res.status(200).json({status : 200, message : "채널 개설에 성공하였습니다"});
            } catch (err) {
                try {
                    await Channel.destroy({where : { name : channel_name, school_id : channel_school_id}});
                    console.log("채널을 개설했지만 개설자를 추가중 오류가 발생하여 채널을 삭제하였습니다\n" + err);
                    return res.status(500).json({status : 500, message : "채널 추가중 오류가 발생하였습니다"});
                }
                catch(err) {
                    console.log("채널을 개설했지만 개설자를 추가중 오류가 발생하여 채널을 삭제하는중 오류가 발생하였습니다\n" + err);
                    return res.status(500).json({status : 500, message : "채널 추가중 오류가 발생하였습니다"});
                }
            }
        } else {
            console.log(`이미 [${channel_school_id}]학교에 ${channel_name}채널이 존재합니다`);
            return res.status(400).json({status : 400, message : "이미 학교에 같은 채널이 존재합니다"});
        }
    } catch (err) {
        console.log("채널을 개설중 오류가 발생하였습니다\n" + err);
        return res.status(500).json({status : 500, message : "채널 추가중 오류가 발생하였습니다"});
    }
}