//파일 시스템 작업
/*
 fs 모듈은 파일 시스템 관련 기능을 제공한다. 
 fs module is in charge of file system.
*/

/*
1.
__filename : 파일의 절대위치를 나타냄. : It shows the absolute path of the file.
__dirname : 파일을 담고있는 디렉토리를 명시한다. : It shows the absolute path of the file's directory
두 변수는 전역변수가 아니다. Two variables ain't global variables.
각 파일마다 정의 된 지역변수 이므로 사용시에 유의하자 . need to be careful to use because there are local variables defined in each file.

*/
console.log('Currently executing file is ' + __filename);
console.log('It is located in ' + __dirname);

/*
2.
현재 작업 디렉토리 : current working  directory. cwd!
function to show : process.cwd()
On running the program, It is possible to change the current directory with process.chdir('str') 
	this chdir() function throws exception in case that the problems come up.
*/

console.log('Starting in' + process.cwd());

// try {
// 	process.chdir('/'); // change the currnet directory to root directory.
// } catch (error) {
// 	console.error('chdir: ' + error.message);
// }
// console.log('current working directory is now ' + process.cwd());

/*
3. Read files.
노드 앱에서 파일을 읽는 가장 단순한 방법은 fs 모듈의 readFile() 과 readFileSync()함수를 사용하는 것이다. 
1) readFile(__filename, option) option : encoding, or additional stuffs
	-인코딩을 명시하지 않을 경우, 파일 내용은 Buffer에 저장되어 반환된다.
	-비동기식 호출인 readFile()은 마지막 인자로 콜백함수를 받는다. 콜백 함수는 오류 객체와 파일내용이라는 두 인자를 받는다.
2) readFileSync()는 파일 내용을 반환하거나 뭔가 잘못되었을 경우 오류를 던진다. 
*/

// var fs = require('fs');
// fs.readFile(__filename, function(error, data) {
// 	if(error) {
// 		return console.error(error.message);
// 	}
// 	console.log(data);
// });

// including {encoding: 'utf8'}
// fs.readFile(__filename, {encoding: 'utf8'}, function(error, data) {
// 	if(error) {
// 		return console.error(error.message);
// 	}
// 	console.log(data);
// });

/*
4. Write files
It could be handled by writeFile or writeFileSync easily. each function corresponds to readFile and readFileSync
1)writeFile(__filename, data, option, function) data can usually be buffer or string.  __filename is dest which is gonna be written.
	-default option : UTF8 encoding
	-last param : call back function as same as readfile()

*/

// var fs = require('fs');
// var data = 'some file data';

// fs.writeFile(__dirname + '/fs-demo.txt', data, {flag: 'wx'}, function(error) {
// 	if(error) return console.error(error.message);
// });



/* Stream
스트림은 두 지점 사이에서 데이터를 옮기는 메커니즘. (정원용 호스) 수원 -> 스트림 -> 스프링 쿨러.
노드의 핵심 모듈은 파일과 소켓처럼 스트림도 많이 활용한다.  
Why stream? instead of processing datas at once, it processes split datas to small pieces
노드는 다양한 유형의 스트림을 구현했기 때문에 혼란을 주기도 한다ㅣ.

1) readable stream.
	-data, close, end, error 이벤트를 전송한다.
	-chunk(data pieces)가 준비되면 buffer형태의 실제 데이터와 함께 data이벤트를 전송한다.
	-createReadStream(), 동시에 아주 큰 파일 여러개를 처리해야 하는 상황에서 readFile()을 사용하면 메모리 사용량과 가비지 컬렉션이 문제가 될 수 있다.
*/

var fs = require('fs');
var stream = fs.createReadStream('./kim.txt');
var writeStream = fs.createWriteStream('./fs-demo.txt');
stream.pipe(writeStream);
stream.on('data', function(data) {
	var chunk = data.toString();
	process.stdout.write(chunk);
});

stream.on('end', function() {
	console.log();
})
stream.on('error', function(error) {
	console.error(error.message);
});

/*
노드 앱은 기본적으로 3가지 표준 스트림에 연결되어 있다. stdin, stdout, stderr
이들 스트림은 프로세스 객체를 통해 얻어올 수 있으며 
	console.log = process.stdout.write(), console.error = process.stderr.write()

노드 앱이 실행되면 stdin은 기본적으로 paused상태로 시작한다. 하지만ㅅ ㅡ트림의 멈춤을 풀고 data이벤트를 처리하는 방법으로 stdin에서 데이터를 읽을 수 있다.

*/
process.stdin.once('data', function(data) {
	process.stdout.write('hello ' + data.toString());
	process.stdin.pause();
});
process.stdout.write('what is your name?' );
process.stdin.resume();





