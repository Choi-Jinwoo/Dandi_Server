const Channel = require("../../models/models").Channel;

module.exports = async function (user_id, req_channel_id) {
    try {
        const result = await Channel.findOne({ //req_id로 개설된 req_channel이 있는지 검색
            where : { id : req_channel_id, create_user : user_id }
        })
        
        if (result === null || result === undefined) { //권한이 없을경우(채널조회의 결과가 없을경우)
            return false;
        }
        
        return true;
    } catch(err) {
        throw err; //에러가 나면 에러를 발생
    }
}