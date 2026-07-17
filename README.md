# 경주문화관광 (Gyeongju Culture Tourism)

경주시 문화관광 홈페이지를 리뉴얼한 팀 프로젝트입니다. 2023년에 팀원 3명이 기획부터 디자인, 구현, 배포까지 각자 맡은 기능을 처음부터 끝까지 책임지는 방식으로 진행했습니다.

- 기획/디자인(Figma): [팀프로젝트 경주문화관광 리디자인](https://www.figma.com/design/DW38ahEwGXSbL6Eon1r5QX/%ED%8C%80%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B2%BD%EC%A3%BC%EB%AC%B8%ED%99%94%EA%B4%80%EA%B4%91_%EB%A6%AC%EB%94%94%EC%9E%90%EC%9D%B8-?node-id=0-1)

## 주요 기능

- **메인 페이지**: 핵심바이블, 보문관광단지, 세계문화유산, 조선시대의 경주, 경주 바다 등 테마별 관광지 소개
- **실시간 정보**: OpenWeatherMap 날씨 API, 공공데이터포털 미세먼지 API 연동
- **여행도우미(지도)**: Kakao Maps API 기반 지도 페이지
- **회원가입/로그인**: Firebase Authentication (이메일/비밀번호, Google 로그인) + Firestore에 추가 프로필 정보 저장
- **주소 검색**: 다음(Daum) 우편번호 API 연동

## 기술 스택

- **Backend**: Node.js, Express, EJS
- **Frontend**: jQuery, Slick Carousel
- **인증/DB**: Firebase Authentication, Firebase Firestore
- **외부 API**: Kakao Maps, OpenWeatherMap, 공공데이터포털(에어코리아), Daum 우편번호

## 시작하기

```bash
cd express
npm install
node server.js
```

서버 실행 후 `http://localhost:7000` 에서 확인할 수 있습니다.

## 팀

3인 팀 프로젝트이며, 팀원 각자가 담당 기능의 기획 · 디자인 · 구현 · 배포를 모두 진행했습니다.
