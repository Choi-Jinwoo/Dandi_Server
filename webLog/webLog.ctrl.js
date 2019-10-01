const fs = require('fs');
const colorConsole = require('../lib/console');

exports.getLog = async (req, res) => {
	try {
		const data = fs.readFileSync('./logs/All-Log.log').toString();
		return res.status(200).send(`성공적으로 로그를 조회하였습니다.</br>로그 요청 시각: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} </br></br>--- START LOG FILE ---</br>${data}</br>--- END LOG FILE ---`);
	} catch(err) {
		colorConsole.red(err.message);
		return res.status(500).send('서버 오류');
	}
}