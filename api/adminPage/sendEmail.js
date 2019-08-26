const nodemailer = require('nodemailer');
const emailInfo = require("../../config/emailInfo");

module.exports = function (email, title, content) {
    const req_email = email;
    
    const transporter = nodemailer.createTransport({
        service : "Gmail",
        auth : {
            user : emailInfo.id, //google id
            pass : emailInfo.pw, //google pw
            domain : ""
        }
    })

    const mailOptions = {
        from : emailInfo.id, //google id
        to : req_email,
        subject : title, //title
        text :  content//content
    }

    return new Promise ((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log("이메일 전송중 오류 발생\n" + err);
                reject(err);
            } else {
                console.log("이메일 전송 완료");
                resolve();
            }
            
        })
    })
}