// mainmenu
$('.submenu-list').hide();

$(".mainmenu-list").hover(function(){
  $(".submenu-back").stop().slideDown(500);
}, function(){
  $(".submenu-back").stop().slideUp(500);
})

// 메인메뉴 hover시 폰트색깔, 이미지 바뀜
$('.mainmenu-item').hover(function () {
  $(this).find('.submenu-list').stop().slideDown(500);
  $('.global-header').css('backgroundColor', '#fbfbfb');
  $('.global-header').css('transition', 'none');
  $('.top-menu, .top-menu a').css('color', '#000');
  $(".menu-img img").attr("src", "../../Project-images/header/topIcon.png");
  $('.mainmenu').css('border-color','#bbb');
  $('.mainmenu-item>a').css('color', '#000');
  $('.mainmenu h1 span').css('color', '#000');
  $(".mainmenu h1 img").attr("src", "../../Project-images/header/logo.png");
  $(".menu-buttons a, i").css('color', '#000');
  $(".menu-buttons img").attr("src", "../../Project-images/header/home-black2.png");
  $(".submenu-list").css("border-top","1px solid #bbb")
  $(this).find(".ul-wrapper").stop().fadeIn(1000);
  $(this).find(".submenu-left-img").stop().fadeIn(1000);
  $(".submenu-left-img p").text($(this).children("a").text())

}, function () {
  $(this).find('.submenu-list').stop().slideUp();
  $('.global-header').css('backgroundColor', 'transparent');
  $('.global-header').css('transition', '1000ms', 'ease-in-out');
  $('.top-menu, .top-menu a').css('color', '#fff');
  $(".menu-img img").attr("src", "../../Project-images/header/topIcon_white.png");
  $('.mainmenu-item>a').css('color', '#fff');
  $('.mainmenu h1 span').css('color', '#fff');
  $(".mainmenu h1 img").attr("src", "../../Project-images/header/white-logo.png");
  $(".menu-buttons a, i").css('color', '#fff');
  $(".menu-buttons img").attr("src", "../../Project-images/header/home-white.png");
  $(this).find(".ul-wrapper").stop().fadeOut(500);
  $(this).find(".submenu-left-img").stop().fadeOut(500);
});

// 날씨 API

$.getJSON(`https://api.openweathermap.org/data/2.5/weather?q=Seoul&limit=5&appid=1255e4aac90af2ff4a1905e43962ab4b&units=metric`, function (result) {
   
    // 현재온도
    $(".temp").append(Math.ceil(result.main.temp)); //현재온도

    // 현재온도 아이콘
    let wiconUrl = '<img src="https://openweathermap.org/img/wn/' + result.weather[0].icon + '.png" alt="' + result.weather[0].description + '">';
    $(".weather-icon").html(wiconUrl);
})

// 미세먼지 API (서버 프록시)
function updateData() {
  $.getJSON('/api/dust', function (responsData) {
    if (responsData.response && responsData.response.body.items) {
      let items = responsData.response.body.items;
      let dataDisplay = document.getElementById('data');
      let latestData = null;
      for (let i = 0; i < items.length; i++) {
        let item = items[i];
        if (item.cityName == '경주시') {
          if (!latestData || item.dataTime > latestData.dataTime) {
            latestData = item;
            let grade = item.pm10Value <= 30 ? '좋음'
                      : item.pm10Value <= 80 ? '보통'
                      : item.pm10Value <= 150 ? '나쁨' : '매우나쁨';
            dataDisplay.innerHTML = '미세먼지 ' + grade;
          }
        }
      }
    }
  });
}

updateData();
setInterval(updateData, 3600000);
// gnb script


$(".gnb-list").hover(function(){
  $(this).find("ul").stop().slideDown();
  $(this).find("ul").addClass("active")
}, function(){
  $(this).find("ul").stop().slideUp();
  $(this).find("ul").removeClass("active")
})


// 오늘 날짜 가져오기
let date = new Date();
let month = date.getMonth() + 1
let day = date.getDate()

// 요일넣기
let todayweek = date.getDay();
let week = ['일', '월', '화', '수', '목', '금', '토'];

let todayLabel = week[todayweek];

// '0' 붙여 두자릿수로 만들기
if (month >= 10) {
    mnum = month;
} else {
    mnum = '0' + month;
}

if (day >= 10) {
    dnum = day;
} else {
    dnum = '0' + day;
}

$('.month').html(mnum);
$('.date').html(dnum);
$('.week').html(todayLabel);


// slide stop/play

$(".stop").click(function(){
  $(".first").css("display","none")
  $(".second").css("display","block")
})

$(".play").click(function(){
  $(".second").css("display","none")
  $(".first").css("display","block")
})




// sub-title 클릭과 호버 스크립트

$(".sub-title1 ul li").click(function(){
  $(".sub-title1 ul li").removeClass("active")
  $(this).addClass("active")
})

// info 클릭 스크립트

$(".info-list li").click(function(){
  $(".info-list li").removeClass("active")
  $(this).addClass("active")
  if($(this).hasClass("content")){
    $(".info-content").css("display","block")
    $(".info-photo").css("display","none")
  }else if($(this).hasClass("photo")){
    $(".info-photo").css("display","block")
    $(".info-content").css("display","none")
  }
})


// footer 스크립트

console.log('[login/script.js] 로드됨, window.firebaseSignIn:', typeof window.firebaseSignIn);

// 토스트 메시지
function showToast(msg) {
  let toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(function () { toast.classList.add('show'); }, 10);
  setTimeout(function () {
    toast.classList.remove('show');
    setTimeout(function () { toast.remove(); }, 300);
  }, 2000);
}

// 로그인 제출

document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  let email = document.getElementById('email').value;
  let pw = document.getElementById('pw').value;

  console.log('[login] 로그인 시도, email:', email, '| firebaseSignIn:', typeof window.firebaseSignIn);

  if (typeof window.firebaseSignIn !== 'function') {
    console.error('[login] Firebase 미로드 - window 키:', Object.keys(window).filter(k => k.startsWith('firebase')));
    showToast('Firebase 로딩 중입니다. 잠시 후 다시 시도해주세요.');
    return;
  }

  window.firebaseSignIn(window.firebaseAuth, email, pw)
    .then(function (userCredential) {
      showToast(userCredential.user.email + '님 안녕하세요!');
      setTimeout(function () { location.href = '/main'; }, 1500);
    })
    .catch(function (error) {
      console.error(error);
      const messages = {
        'auth/user-not-found': '등록되지 않은 이메일입니다.',
        'auth/wrong-password': '비밀번호가 올바르지 않습니다.',
        'auth/invalid-email': '이메일 형식이 올바르지 않습니다.',
        'auth/invalid-credential': '이메일 또는 비밀번호가 올바르지 않습니다.',
        'auth/too-many-requests': '로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.',
        'auth/network-request-failed': '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      };
      showToast(messages[error.code] || '로그인에 실패했습니다. 다시 시도해주세요.');
    });
})

// 구글 로그인

document.getElementById('google-login').addEventListener('click', function () {
  console.log('[login] 구글 로그인 시도, firebaseSignInWithPopup:', typeof window.firebaseSignInWithPopup);
  if (typeof window.firebaseSignInWithPopup !== 'function') {
    showToast('Firebase 로딩 중입니다. 잠시 후 다시 시도해주세요.');
    return;
  }
  window.firebaseSignInWithPopup(window.firebaseAuth, window.firebaseGoogleProvider)
    .then(function (result) {
      let user = result.user;
      let profileRef = window.firebaseDoc(window.firebaseDb, 'users', user.uid);

      return window.firebaseGetDoc(profileRef).then(function (snap) {
        if (!snap.exists()) {
          return window.firebaseSetDoc(profileRef, { name: user.displayName || user.email });
        }
      });
    })
    .then(function () {
      location.href = '/main';
    })
    .catch(function (error) {
      console.error(error);
      showToast('오류: ' + error.code);
    });
})

$(document).ready(function(){
  $('.banner-site-list').slick({
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
  });

  $('.play').click(function(){
    $('.banner-site-list').slick('slickPlay');
    
  }); 
  $('.stop').click(function(){
    $('.banner-site-list').slick('slickPause');

  });

})

$(".stop").click(function(){
  $(".first").css("display","none")
  $(".second").css("display","block")
})

$(".play").click(function(){
  $(".second").css("display","none")
  $(".first").css("display","block")
})