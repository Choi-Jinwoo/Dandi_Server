module.exports = (length) => {
	let code = "";
	const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

	for (let i = 0; i < length; i++) {
			const rnum = Math.floor(Math.random() * chars.length);
			code += chars.substring(rnum, rnum + 1);
	}

	return code;
}