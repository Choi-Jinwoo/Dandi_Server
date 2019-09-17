const sendEmail = require("../adminPage/sendEmail");
const randomCode = require("./randomCode");
const colorConsole = require("../../lib/console");

module.exports = async (req, res) => {
    colorConsole.green("[auth] 인증번호 발송")
    const { user_email } = req.body;
    const authCode = randomCode();
    
    colorConsole.gray("request");
    colorConsole.gray({ user_email });

    if (!user_email) {
        colorConsole.yellow("검증 오류입니다.");
        return res.status(400).json({ status : 400, message : "검증 오류입니다." });
    }

    try {
        await sendEmail(user_email, "[단디] 인증번호", authCode);
        return res.status(200).json({ status : 200, message : "인증번호 발송에 성공하였습니다.", data : { authCode } });
    } catch(err) {
        if (err.status === 400) {
            colorConsole.yellow(err.message);
            return res.status(400).json({ status  : 400, message : err.message });
        }
        colorConsole.red(err.message);
        return res.status(500).json({ status : 500, message : "인증번호 발송에 실패하였습니다." });
    }
}