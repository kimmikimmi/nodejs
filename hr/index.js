

// /*
// res = response : http.ServerResponse객체 .. 들어오는 요청에 대한 응답.

// req = request : 여기서는 http.ClientRequest객체. ... 들어오는 요청.. 
// */

/*
	라우팅
	1. 직원 목록을 검색하는 라우트
	2. 특정 직원을 찾는 라우트
	3. 정적 파일을 찾는 다목적 라우트

*/


var http = require('http');
var colors = require('colors');
var employeeService = require('./lib/employees');

var responder = require('./lib/responseGenerator');
var staticFile = responder.staticFile('/public');


Array.prototype.find = function (predicate) {
	for(var i=0, value; i < this.length; i++) {
		value = this[i];
		if(predicate.call(this, value))
			return value;
	}
	return undefined;
}


var server = http.createServer(function (req, res) {
	var _url; // 인자를 파싱한 url
		// 메서드 명을 소문자로 사용하는 클라이언트에 대비하여 대문자로 통일
	req.method = req.method.toUpperCase();
	console.log(req.method + ' ' + req.url);


	if(req.method !== 'GET') {
		res.writeHead(501, {
			'Content-Type' : 'text/plain'
		});
		return res.end(req.method + ' is not implemented by this server');
	}
	if(_url = /^\/employees$/i.exec(req.url)) {
		
		//직원 목록 반환
		employeeService.getEmployees(function(error, data) {
			if(error) {
				//500 오류 전송
				return responder.send500(error, res);
			} 
			// 200 상태코드와 함께 데이터 전송
			return responder.sendJson(data, res);
		});
		
	} else if(_url = /^\/employees\/(\d+)$/i.exec(req.url)) {
		//라우트에 포함된 id로 직원 검색
		employeeService.getEmployee(_url[1], function(error, data) {
			if(error) {
				// 500오류 전송
				return responder.send500(error, res);
			}

			if(!data) {
				//404오류 전송
				return responder.send404(res);
			}
			// 200상태 코드와 함께 데이터 전송
			return responder.sendJson(data, res);
		});
		
	} else {
		//파일이 존재하면 정적 파일 전송시도
		//그렇지않으면 404 오류 전송
		staticFile(req.url, res);
	}
	
		
});
server.listen(1337);

console.log('Server is running at 127.0.0.1/1337/')