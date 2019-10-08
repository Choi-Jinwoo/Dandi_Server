module.exports = function (req, res, next) {
	var protocol = req.protocol;
	var hostHeaderIndex = req.rawHeaders.indexOf('Host') + 1;
	var host = hostHeaderIndex ? req.rawHeaders[hostHeaderIndex] : undefined;
	Object.defineProperty(req, 'origin', {
		get: function () {

			if (!host)
				return req.headers.referer ? req.headers.referer.substring(0, req.headers.referer.length - 1) : undefined;
			else
				return protocol + '://' + host;
		}
	});
	next();
};