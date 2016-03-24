/*
웹 프로그래밍. : 노드는 웹 앱 개발로 유명세를 타고 있으며 웹 서버는 노드 프로젝트 홈페이지에도 주요 기능으로 올라와 있다. 이 절은 특히 HTTP서버에 초점을 맞출 것이다.
일반적인 TCP/IP프로그래밍에 관심 있다면 net핵심 모듈을 확인하기 바란다.

1) 서버 생성.
2) 라우트
	-HTTP동사와 요청 URL의 조합.
	-HTTP동사는 req.method()로 확인
	-요청 URL은 req.url로 확인.
3) 요청 헤더 접근하기

*/

// var http = require('http'); // http 모듈을 http 변수에 저장.

// http.createServer(function(req, res) {
// 	res.writeHead(200, {'Content-Type': 'text/plain'}); // 200ok 상태코드 , text/plain으로 설정된 content-type응답 헤더.
// 	res.end('Hello World');
// }).listen(1337, '127.0.0.1'); /// 서버시작의 마지막 단계는 listen함수 호출.

// console.log('server is running at http://127.0.0.1:1337/');

/*
	개선된 서버
	req.method(), req.url
	+
	요청 헤더 접근하기..
	웹앱에서 상태 유지를 위해 사용되는 Cookie는 요청 헤더를 사용해서 클라이언트에서 서버로 전송된다. 마찬가지로 서버가 쿠키를 설정할 때는 Set-Cookie응답 헤더를 사용한다.
	노드는 req.headers를 통해 요청 헤더값을 아주 쉽게 얻을 수 있다. 또한 노드는 모든 헤더 이름을 소문자로 처리하기 떄문에 대소문자를 신경쓸 필요도 없다.
	예를 들어 Cookie요청 헤더값을 읽으려면 req.header.cookie를 확인하면 된다. 또한 User-Agent처럼 이름에 하이푼이 있는 헤더라면 req.header['user-agent']
	형태를 사용하면 된다. 
*/


var http = require('http');
http.createServer(function(req, res){
	if(req.url === '/' && req.method == 'GET') {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end('Hello <strong>home page</strong>' + ' your user account is ' + req.headers['user-agent']); 

	} else if (req.url === '/account' && req.method === 'GET') {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end("Hello <strong>account page </strong>");
	} else {
		res.writeHead(404, {'Content-Type': 'text/html'});
		res.end();
	}
}).listen(1337);	console.log('server is running');