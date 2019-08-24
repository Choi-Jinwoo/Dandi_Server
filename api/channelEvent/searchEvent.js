
const ChannelEvent = require("../../models/models").ChannelEvent;
const isMember = require("./isMember");
const sequelize = require("sequelize");
module.exports = async function (req, res) {
    const user = req.user;
    
    const req_channel_id = req.query.channel_id; //querystring으로 channel_id를 받아옴
    const searchKeyword = req.query.keyword; //querystring으로 키워도를 받아옴

    try {
        if (!await isMember(user.user_id, req_channel_id)) { //멤버가 아니라면
            console.log("일정을 삭제할 권한이 없습니다 id : " + user.user_id);
            return res.status(403).json({status : 403, message : "일정을 삭제할 권한이 없습니다"});
        }
        const searchedResult = await ChannelEvent.findAll({ //키워드가 들어간 일정을 찾음
            where : { title : {
                [sequelize.Op.like] : "%" + searchKeyword + "%"
            }, channel_id : req_channel_id }
        })
        
        if (searchedResult.length === 0) { //결과가 없다면
            console.log("검색된 결과가 없습니다 id : " + user.user_id);
            return res.status(400).json({status : 400, message : "검색된 결과가 없습니다"});
        }
        
        console.log(`[${searchKeyword}]를 검색하였습니다 id : ${user.user_id}`);
        return res.status(200).json({status : 200, message : "검색에 성공하였습니다" , data : { searchedEvent : searchedResult }});
    } catch(err) {
        console.log("검색중 오류가 발생하였습니다\n" + err);
        return res.status(500).json({status : 500, message : "검색중 오류가 발생하였습니다"});
    }
}