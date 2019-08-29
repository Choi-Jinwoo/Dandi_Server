const Channel = require("../../models/models").Channel;

module.exports = async function (req, res) {
    const user = req.user;
    
    const req_channel_name = req.query.channel_name; //querystring으로 channel_name을 받아옴
    const req_school = user.school;

    if (!req_channel_name) {
        try {
            const schoolChannel = await Channel.findAll({
                where : { school_id : req_school }
            })
    
            if (schoolChannel === null || schoolChannel === undefined) { //채널에 대한 정보가 없을경우
                console.log(`[${req_school}]학교 채널 정보가 없습니다`);
                return res.status(400).json({status : 400, message : "학교 채널 정보가 없습니다"});
            }
    
            console.log(`[${req_school}]학교 채널 정보를 조회하였습니다 id : ${user.user_id}`); 
            return res.status(200).json({status : 200, message : "학교 채널 정보를 조회하였습니다", data : {channel : schoolChannel}});
        } catch(err) {
            console.log("채널을 조회중 오류가 발생하였습니다\n" + err);
            return res.status(500).json({status : 500, message : "채널을 조회중 오류가 발생하였습니다"});
        }
    } else {
        try {
            schoolChannel = await Channel.findOne({
                where : { name : req_channel_name, school_id : req_school }
            })
    
            if (schoolChannel === null || schoolChannel === undefined) {
                console.log(`[${req_school}]학교에 ${req_channel_name} 채널에 대한 정보가 없습니다`);
                return res.status(400).json({status : 400, message : "채널에 대한 정보가 없습니다"})
            }
            console.log(`[${req_school}]학교에 ${req_channel_name} 채널에 대한 정보를 조회하였습니다 id : ${user.user_id}`);
            return res.status(200).json({status : 200, message : "채널에 대한 정보를 조회하였습니다", data : {channel : schoolChannel}});    
        } catch(err) {
            console.log("채널을 조회중 오류가 발생하였습니다\n" + err);
            return res.status(500).json({status : 500, message : "채널을 조회중 오류가 발생하였습니다"});
        }
    }
}