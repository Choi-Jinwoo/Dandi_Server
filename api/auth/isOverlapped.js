const models = require("../../models/models");
const colorConsole = require("../../lib/console");

module.exports = async (req, res) => {
    colorConsole.green("[auth] 중복 확인");
    const { user_id } = req.body;
    
    if (!user_id) {
        colorConsole.gray("검증 오류입니다.");
        return res.status(400).json({ status : 400, message : "검증 오류입니다." });
    }

    try {
        const overlapUser = await User.findOne({ where : { user_id } });

        if (overlapUser) {
            colorConsole.yellow("[auth] 중복된 아이디입니다.");
            colorConsole.gray(user_id);
            return res.status(400).json({ status : 400, message : "중복된 아이디입니다.", data : { isOverlapped : true } });     
        }
        
        return res.status(200).json({ status : 200, message : "중복되지 않은 아이디입니다.", data : { isOverlapped : false } });     
    } catch(err) {
        colorConsole.gray(err.message);
        return res.status(500).json({ status : 500, message : "중복확인에 실패하였습니다." });
    }
}