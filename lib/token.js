require('dotenv').config();

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

exports.createToken = async (user_id) => {
	const payload = {
		user_id,
	}
	const options = {
		expiresIn: '12h',
		issuer: 'dandi',
		subject: 'token',
	}
	try {
		return jwt.sign(payload, JWT_SECRET, options);
	} catch (err) {
		throw err;
	}
}

exports.verifyToken = async (token) => {
	try {
		return await jwt.verify(token, JWT_SECRET)
	} catch (err) {
		throw err;
	}
}