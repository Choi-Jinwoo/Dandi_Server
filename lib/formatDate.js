module.exports = (data) => {
	if (!parseInt(data)) {
		return NaN;
	}
	if (parseInt(data) < 10) {
			data = parseInt(data);
			return `0${data}`;
	} else {
			return data;
	}
}