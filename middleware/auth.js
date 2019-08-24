const express = require('express');
const tokenLib = require("../lib/token");
const User = require("../models/models").User;

/**
 * @param {express.Request} req
 */
module.exports = function (req, res, next) {
    const { token } = req.headers;
    
    if (!token) {
        console.log("토큰이 없습니다");
        return res.status(403).json({status : 403, message : "토큰을 전송해주세요"})
    }
    
    try {
        const decoded = tokenLib.verifyToken(token);
        
        if (!decoded) {
            console.log("토큰을 decode값이 null 혹은 undefined입니다 token : " + token)
            return res.status(403).json({status : 403, message : "토큰 정보가 없습니다"});
        } else {
            User.findOne({
                where : { user_id : decoded.user_id}
            })
            .then((user) => {
                if (user === null || user === undefined) {
                    console.log("토큰에 대한 유저 정보가 없습니다 token : " + token)
                    return res.status(403).json({status : 403, message : "토큰에 대한 유저 정보가 없습니다"});
                } else {
                    req.user = user;
                    next()
                }
            })
            .catch((err) => {
                console.log("토큰에 대한 유저 정보를 조회중 오류가 발생하였습니다");
                return res.status(500).json({status : 500, message : "토큰 검증중 오류가 발생하였습니다"});
            })
        }
    } catch(err) {
        if (err.message === "jwt expired") {
            console.log("토큰이 만료되었습니다");
            return res.status(410).json({status : 410, message : "토큰이 만료되었습니다"});
        } else if(err.message === "invalid signature") {
            console.log("위조된 토큰입니다");
            return res.status(403).json({status : 403, message : "위조된 토큰입니다"});
        }
        
        console.log("토큰 확인중 오류가 발생하였습니다\n" + err);
        return res.status(500).json({status : 500, message : "토큰 확인중 오류가 발생하였습니다"});
    }

}
