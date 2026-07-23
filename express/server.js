
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
const path = require('path');
const app = express();

if (process.env.NODE_ENV !== 'production') {
    app.listen(7000, function () {
        console.log('7000번 포트')
    })
}

// 정적 파일 경로를 절대경로(__dirname)로 지정 (Vercel 서버리스 호환)
app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'main')))
app.use(express.static(path.join(__dirname, 'tripHelper_sub5')))
app.use(express.static(path.join(__dirname, 'loginPages')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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

// 미세먼지 API 프록시 (정부 API는 CORS 미지원 + HTTP → 서버에서 대신 호출)
app.get('/api/dust', async function (req, res) {
    try {
        const serviceKey = '7gpEZV105Yp6x9Fq7q3wadEQtdMDnJ5YUCi86TMqXyp1l3ox8sh7vZaN1%2BV6rNe%2BuoSVktxWkKtR4%2B%2F0CQZGwQ%3D%3D';
        const url = `https://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureSidoLIst?serviceKey=${serviceKey}&returnType=json&numOfRows=100&pageNo=1&sidoName=%EA%B2%BD%EB%B6%81&searchCondition=DAILY`;
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: 'dust api failed' });
    }
});

module.exports = app;



