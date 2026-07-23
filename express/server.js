
/*
google cloud를 통해 배포하기 위해 파일명을 server.js로 바꿈
package.json에서도 index.js -> server.js로 변경해야 함

코드 수정 후 재 실행시 아래 명령어를 입력한다.
    gcloud init
    gcloud app deploy
*/

/*
[설치 목록]
 * ejs링크 연결
 * 설치 : npm install ejs
*/




const express = require('express');
const app = express();

app.listen(7000, function () {
    console.log('7000번 포트')
})

// 폴더 내 모든 정적파일 제공(js, css, images, fonts)
// 폴더명 다를시 변경해야함
app.use(express.static(__dirname))
app.use(express.static("./tripHelper_sub5"))
app.use(express.static("./loginPages"))


/*************************
 * 링크 연결
 * 설치 : npm install ejs
 * ***********************/
app.set('view engine', 'ejs');

// 메인페이지
app.get('/', function (requests, response) {
    response.render('main.ejs')
})

// 로그인
app.get('/login', function (requests, response) {
    response.render('login.ejs')
})

// 회원가입
app.get('/join', function (requests, response) {
    response.render('join.ejs')
})

// 지도
app.get('/map', function (requests, response) {
    response.render('map.ejs')
})

// 약관동의
app.get('/agree', function (requests, response) {
    response.sendFile(__dirname + '/loginPages/agree/agree.html')
})

app.get('/main', function (requests, response) {
    response.render('main.ejs')
})

app.get('/logout', function (requests, response) {
    response.redirect('/login');
})

module.exports = app;



