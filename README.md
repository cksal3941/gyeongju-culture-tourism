# 경주문화관광 웹사이트 리뉴얼

> 경주시 문화관광 홈페이지를 리뉴얼한 팀 프로젝트입니다.

[![Vercel](https://img.shields.io/badge/Vercel-배포중-black?logo=vercel&logoColor=white)](https://gyeongju-culture-tourism.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-저장소-181717?logo=github)](https://github.com/cksal3941/gyeongju-culture-tourism)

## 📌 프로젝트 소개

경주시 공식 문화관광 웹사이트를 참고하여 리뉴얼한 팀 프로젝트입니다.  
2023년 8월, AI 도움 없이 3인이 약 1주일간 하드코딩으로 완성했습니다.  
이후 MongoDB를 Firebase로 전환하고, Claude AI를 활용해 버그를 수정하며 Vercel에 재배포했습니다.

🔗 **배포 주소**: [https://gyeongju-culture-tourism.vercel.app](https://gyeongju-culture-tourism.vercel.app/)  
🎨 **Figma 디자인**: [피그마 보기](https://www.figma.com/design/DW38ahEwGXSbL6Eon1r5QX/%ED%8C%80%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B2%BD%EC%A3%BC%EB%AC%B8%ED%99%94%EA%B4%80%EA%B4%91_%EB%A6%AC%EB%94%94%EC%9E%90%EC%9D%B8-?node-id=0-1&t=UHtxg4OrPk9GzZAK-1)

---

## 🛠 기술 스택

### Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![jQuery](https://img.shields.io/badge/jQuery-0769AD?logo=jquery&logoColor=white)

- **Slick Carousel** — 이미지 슬라이더
- **Daum Postcode API** — 우편번호 검색 (회원가입)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-템플릿엔진-green)

### Database / Auth
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)

- **Firebase Authentication** — 이메일/비밀번호 로그인, Google 소셜 로그인
- **Cloud Firestore** — 회원 프로필 데이터 저장

### 외부 API

| API | 용도 |
|-----|------|
| OpenWeatherMap | 현재 날씨 및 기온 표시 |
| 공공데이터 미세먼지 API (에어코리아) | 경주시 미세먼지 농도 표시 (서버 프록시 방식) |
| Kakao Maps | 지도/여행도우미 페이지 |
| Daum Postcode | 회원가입 주소 검색 |

### 배포 / 디자인
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white)

---

## 📁 프로젝트 구조

```
gyeongju-culture-tourism/
├── express/
│   ├── server.js              # Express 서버 진입점
│   ├── views/                 # EJS 템플릿 (서버사이드 렌더링)
│   │   ├── main.ejs           # 메인 페이지
│   │   ├── login.ejs          # 로그인
│   │   ├── join.ejs           # 회원가입
│   │   ├── edit.ejs           # 회원정보 수정
│   │   └── map.ejs            # 지도/여행도우미
│   ├── main/                  # 메인 페이지 정적 파일
│   ├── travel_sub1/           # 경주여행 서브페이지
│   ├── festival_sub2/         # 문화행사 서브페이지
│   ├── culture_sub3/          # 문화재·역사 서브페이지
│   ├── food_sub4/             # 음식·숙박·쇼핑 서브페이지
│   ├── tripHelper_sub5/       # 여행도우미 서브페이지
│   ├── loginPages/            # 로그인/회원가입 관련 스크립트 및 스타일
│   │   ├── firebase-config.js
│   │   ├── login/
│   │   ├── join/
│   │   ├── edit/
│   │   └── agree/
│   ├── Project-images/        # 이미지 리소스
│   └── css/                   # 공통 스타일
└── vercel.json                # Vercel 배포 설정
```

---

## 📄 주요 페이지

| 경로 | 페이지 |
|------|--------|
| `/` `/main` | 메인 페이지 (날씨, 미세먼지, 슬라이드) |
| `/login` | 로그인 (이메일 / Google) |
| `/join` | 회원가입 |
| `/map` | 여행도우미 / 지도 |
| `/travel_sub1/travel.html` | 경주여행 |
| `/festival_sub2/festival.html` | 문화행사 |
| `/culture_sub3/culture.html` | 문화재·역사 |
| `/food_sub4/food.html` | 음식·숙박·쇼핑 |

---

## ⚙️ 로컬 실행 방법

```bash
# 저장소 클론
git clone https://github.com/cksal3941/gyeongju-culture-tourism.git
cd gyeongju-culture-tourism/express

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

서버 실행 후 `http://localhost:7000` 에서 확인할 수 있습니다.

---

## 🔥 주요 기능

- **메인 슬라이드** — Slick Carousel을 이용한 자동 슬라이드
- **실시간 날씨** — OpenWeatherMap API로 현재 날씨/기온 표시
- **미세먼지 정보** — 경주시 실시간 미세먼지 농도 (서버 프록시로 CORS·HTTPS 문제 우회)
- **회원가입 / 로그인** — Firebase Auth 기반 이메일 및 Google 소셜 로그인
- **회원 프로필 저장** — Firestore에 이름, 전화번호, 주소 저장
- **우편번호 검색** — Daum Postcode API 연동
- **드롭다운 메가 메뉴** — jQuery hover 기반 네비게이션

---

## 📝 개발 히스토리

| 시기 | 내용 |
|------|------|
| 2023년 8월 | 3인 팀, 약 1주 동안 하드코딩으로 초기 개발 완료 |
| 이후 | MongoDB → Firebase (Auth + Firestore) 로 DB/인증 전환 |
| 최근 | Claude AI로 버그 수정, HTTPS Mixed Content 해결, Vercel 재배포 |

---

## 👥 팀

3인 팀 프로젝트로, 기획 · Figma 디자인 · 구현 · 배포를 함께 진행했습니다.

---

## 📜 라이선스

This project is open source and available under the [MIT License](LICENSE).
