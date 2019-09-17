const nodemailer = require('nodemailer');
const emailInfo = require("../../config/emailInfo");

module.exports = async (email, title, content) => {
    const transporter = nodemailer.createTransport({
        service : "Gmail",
        auth : {
            user : emailInfo.id,
            pass : emailInfo.pw,
            domain : "",
        },
    })

    const mailOptions = {
        from : emailInfo.id,
        to : email,
        subject : title,
        text :  content,
    }

    try {
        await transporter.sendMail(mailOptions);
        return;
    } catch(err) {
        if (err.message === "No recipients defined") {
            throw {
                status : 400,
                message : "존재하지 않는 메일입니다."
            }
        }
        console.log(err);
        throw {
            status : 500,
            message : "메일 발송에 실패하였습니다",
        };
    }
}