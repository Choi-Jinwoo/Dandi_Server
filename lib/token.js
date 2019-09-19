const jwt = require('jsonwebtoken');
const tokenInfo = require('../config/tokenInfo');

exports.createToken = (user_id) => {
    const payload = {
        user_id
    }

    const options = {
        expiresIn : '12 hours',
        issuer : 'dandi',
        subject : 'token'
    }
    
    try {
        const token = jwt.sign(payload, tokenInfo.secret, options);
        return token;
    } catch (err) {
        throw err;
    }
}

exports.verifyToken = (token) => {
    try {
        const verified = jwt.verify(token, tokenInfo.secret)
        return verified;
    } catch(err) {
        throw err;
    }
}