const express = require("express");
const login = require("../api/auth/login");
const signup = require("../api/auth/signup");
const tokenMiddleware = require('../middleware/auth'); //middleware
const isOverlapped = require("../api/auth/isOverlapped");
const sendEmail = require("../api/auth/sendEmail");

const router = express.Router();

router.post("/login",  login);
router.post("/signup", signup);
router.post("/signup/isoverlapped", isOverlapped);
router.post("/signup/sendemail", (req, res) => {
        sendEmail(req)
        .then((randomCode) => {
            return res.status(200).json({status : 200, message : "이메일 전송에 성공하였습니다", data : {authCode : randomCode}})
        })
        .catch((err) => {
            console.log("이메일 전송중 오류 발생\n" + err);
            return res.status(500).json({status : 500, message : "이메일 전송 중 오류가 발생하였습니다"});
        })
});

module.exports = router;