const jwt = require('jsonwebtoken');
const tokenInfo = require("../config/tokenInfo");

function createToken(user_id) {
    const payload = {
        user_id
    }

    const options = {
        expiresIn : "2 hours",
        issuer : "SCHOOLER",
        subject : "token"
    }
    
    try {
        const result = jwt.sign(payload, tokenInfo.secret, options);
        console.log(`토큰이 생성되었습니다 : ${user_id}\ntoken : ${result}`);
        return result;
    } 
    catch (err) {
        console.log("토큰 발급에 실패하였습니다\n", err);
        throw err;
    }
}

function verifyToken (token) {
    try {
        console.log(token);
        const result = jwt.verify(token, tokenInfo.secret)
        return result;
    } catch(err) {
        console.log(err.message);
        throw err;
    }
}

module.exports = {
    createToken,
    verifyToken    
}