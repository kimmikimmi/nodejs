var http = require('http');

http.createServer(function(res, req) {
	var = url; // 인자를 파싱한 url

	// 메서드 명을 소문자로 사용하는 클라이언트에 대비하여 대문자로 통일
	req.method() = req.method.toUpperCase();
	console.log(req.method + ' ' + req.url);
	res.end('The current time is ' + Date.now())
}).listen(1337, '127.0.0.1');

console.log('server is running at http://127.0.0.1/1337/')