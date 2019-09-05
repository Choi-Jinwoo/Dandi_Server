module.exports = () => {
	let code = "";
	const code_length = 10;
	const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

	for (let i = 0; i < code_length; i++) {
			const rnum = Math.floor(Math.random() * chars.length);
			code += chars.substring(rnum, rnum + 1);
	}

	return code;
}