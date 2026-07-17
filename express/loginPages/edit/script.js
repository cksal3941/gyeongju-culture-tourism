// mainmenu
$('.submenu-list').hide();

$(".mainmenu-list").hover(function () {
  $(".submenu-back").stop().slideDown(500);
}, function () {
  $(".submenu-back").stop().slideUp(500);
})

// 메인메뉴 hover시 폰트색깔, 이미지 바뀜
$('.mainmenu-item').hover(function () {
  $(this).find('.submenu-list').stop().slideDown(500);
  $('.global-header').css('backgroundColor', '#fbfbfb');
  $('.global-header').css('transition', 'none');
  $('.top-menu, .top-menu a').css('color', '#000');
  $(".menu-img img").attr("src", "../Project-images/header/topIcon.png");
  $('.mainmenu').css('border-color', '#bbb');
  $('.mainmenu-item>a').css('color', '#000');
  $('.mainmenu h1 span').css('color', '#000');
  $(".mainmenu h1 img").attr("src", "../Project-images/header/logo.png");
  $(".menu-buttons a, i").css('color', '#000');
  $(".menu-buttons img").attr("src", "../Project-images/header/home-black2.png");
  $(".submenu-list").css("border-top", "1px solid #bbb")
  $(this).find(".ul-wrapper").stop().fadeIn(1000);
  $(this).find(".submenu-left-img").stop().fadeIn(1000);
  $(".submenu-left-img p").text($(this).children("a").text())

}, function () {
  $(this).find('.submenu-list').stop().slideUp();
  $('.global-header').css('backgroundColor', 'transparent');
  $('.global-header').css('transition', '1000ms', 'ease-in-out');
  $('.top-menu, .top-menu a').css('color', '#fff');
  $(".menu-img img").attr("src", "../Project-images/header/topIcon_white.png");
  $('.mainmenu-item>a').css('color', '#fff');
  $('.mainmenu h1 span').css('color', '#fff');
  $(".mainmenu h1 img").attr("src", "../Project-images/header/white-logo.png");
  $(".menu-buttons a, i").css('color', '#fff');
  $(".menu-buttons img").attr("src", "../Project-images/header/home-white.png");
  $(this).find(".ul-wrapper").stop().fadeOut(500);
  $(this).find(".submenu-left-img").stop().fadeOut(500);
});
// 날씨 API

$.getJSON(`https://api.openweathermap.org/data/2.5/weather?q=Seoul&limit=5&appid=1255e4aac90af2ff4a1905e43962ab4b&units=metric`, function (result) {

  // 현재온도
  $(".temp").append(result.main.temp); //현재온도

  // 현재온도 아이콘
  let wiconUrl = '<img src="http://openweathermap.org/img/wn/' + result.weather[0].icon + '.png" alt="' + result.weather[0].description + '">';
  $(".weather-icon").html(wiconUrl);
})

// gnb script


$(".gnb-list").hover(function () {
  $(this).find("ul").stop().slideDown();
  $(this).find("ul").addClass("active")
}, function () {
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

$(".stop").click(function () {
  $(".first").css("display", "none")
  $(".second").css("display", "block")
})

$(".play").click(function () {
  $(".second").css("display", "none")
  $(".first").css("display", "block")
})




// sub-title 클릭과 호버 스크립트

$(".sub-title1 ul li").click(function () {
  $(".sub-title1 ul li").removeClass("active")
  $(this).addClass("active")
})

// info 클릭 스크립트

$(".info-list li").click(function () {
  $(".info-list li").removeClass("active")
  $(this).addClass("active")
  if ($(this).hasClass("content")) {
    $(".info-content").css("display", "block")
    $(".info-photo").css("display", "none")
  } else if ($(this).hasClass("photo")) {
    $(".info-photo").css("display", "block")
    $(".info-content").css("display", "none")
  }
})

// slide 스크립트

$(document).ready(function () {
  $('.slide-imgs').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    dots: true,
    appendDots: $(".num"),
    autoplaySpeed: 4000,
    pauseOnHover: true,
    prevArrow: $('#prev'),
    nextArrow: $('#next'),
  });

  $('#play').click(function () {
    $('.slide-imgs').slick('slickPlay');

  });
  $('#pause').click(function () {
    $('.slide-imgs').slick('slickPause');

  });
})

$(".slick-dots li button").attr("disabled", false)


$("#pause").click(function () {
  $("#pause").css("display", "none")
  $("#play").css("display", "block")
})

$("#play").click(function () {
  $("#play").css("display", "none")
  $("#pause").css("display", "block")
})


// footer 스크립트

$(document).ready(function () {
  $('.banner-site-list').slick({
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
  });

  $('.play').click(function () {
    $('.banner-site-list').slick('slickPlay');

  });
  $('.stop').click(function () {
    $('.banner-site-list').slick('slickPause');

  });

})

$(".stop").click(function () {
  $(".first").css("display", "none")
  $(".second").css("display", "block")
})

$(".play").click(function () {
  $(".second").css("display", "none")
  $(".first").css("display", "block")
})


/*********************
 * 회원가입 폼 script *
 ********************/


let idveri = pwveri = pwchkveri = nameveri = emailveri = false;

// Essention Infomation
let essenInfo = '<span class="text-red"> 필수 정보입니다. </span>';


// 아이디
// window.onload = function () {

document.querySelector('.id input').addEventListener('focusout', function () {
  let userId = this.value;
  let idExp = /^[a-z0-9]{5,8}$/;
  let idWarn = document.querySelector('.id .warn');

  if (userId.length == 0) {
    // 필수 정보입니다.
    idWarn.innerHTML = essenInfo
  } else if (!idExp.test(userId)) {
    // 정규식에 맞지 않을때
    idWarn.innerHTML = '<span class="text-red"> 5~8자의 영문 소문자, 숫자만 사용 가능합니다. </span>';
  } else {
    idveri = true;
    idWarn.innerHTML = '<span class="text-green"> 멋진 아이디네요! </span>';
  }
})

// }

// 비밀번호
let userPw = document.querySelector('.userpw input');

userPw.addEventListener('focusout', function () {
  let userPwVal = userPw.value;
  let pwExp = /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{8,20}$/;
  let pwWarn = document.querySelector('.userpw .warn');
  let pwText = document.querySelector('.userpw .pw-text');
  let pwImg = document.querySelector('.userpw .pw-img');

  if (userPwVal.length == 0) {
    pwWarn.innerHTML = essenInfo;
    pwText.innerHTML = '';
    pwImg.src = '../Project-images/login/m_icon_pw_step_01.png';
  } else if (!pwExp.test(userPwVal)) {
    pwWarn.innerHTML = '<span class="text-red"> 8~20자 영문 대 소문자, 숫자, 특수문자를 사용하세요. </span>';
    pwText.innerHTML = '<span class="text-red"> 사용불가 </span>';
    pwImg.src = '../Project-images/login/m_icon_pw_step_10.png';
  } else {
    pwveri = true;
    pwWarn.innerHTML = '';
    pwText.innerHTML = '<span class="text-green"> 안전 </span>';
    pwImg.src = '../Project-images/login/m_icon_pw_step_04.png';
  }
})


// 비밀번호 재확인
document.querySelector('.userpw-chk input').addEventListener('focusout', function () {
  let userpwChk = this.value;
  let pwChkWarn = document.querySelector('.userpw-chk .warn');
  let pwChkText = document.querySelector('.userpw-chk .pw-text');
  let pwChkImg = document.querySelector('.userpw-chk .pw-img');

  if (userpwChk.length == 0) {
    pwChkWarn.innerHTML = essenInfo;
    pwChkText.innerHTML = '';
    pwChkImg.src = '../Project-images/login/m_icon_pw_step_01.png';
  } else if (userpwChk == userPw.value) {
    pwchkveri = true;
    pwChkWarn.innerHTML = '';
    pwChkText.innerHTML = '<span class="text-green"> 일치 </span>';
    pwChkImg.src = '../Project-images/login/m_icon_pw_step_07.png';
  } else {
    pwChkWarn.innerHTML = '<span class="text-red">비밀번호가 일치하지 않습니다.</span>';
    pwChkText.innerHTML = '';
    pwChkImg.src = '../Project-images/login/m_icon_pw_step_02.png';
  }
})

// 이름
document.querySelector('.username input').addEventListener('focusout', function () {
  let userName = this.value;
  let nameExp = /^[가-힣]{2,5}$/;
  let nameWarn = document.querySelector('.username .warn');

  if (userName.length == 0) {
    nameWarn.innerHTML = essenInfo;
  } else if (!nameExp.test(userName)) {
    nameWarn.innerHTML = '<span class="text-red"> 한글로 2~5글자 사이로 작성하세요. </span>';
  } else {
    nameveri = true;
    nameWarn.innerHTML = '';
  }
})


document.querySelector('.usermail input').addEventListener('focusout', function () {
  let usermail = this.value;
  let mailWarn = document.querySelector('.usermail .warn');

  let mailExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  if (usermail == 0) {
    mailWarn.innerHTML = essenInfo;
  } else if (!mailExp.test(usermail)) {
    mailWarn.innerHTML = '<span class="text-red"> 이메일 주소를 다시 확인 해주세요. </span>';
  } else {
    emailveri = true;
    mailWarn.innerHTML = '';
  }
})




// 가입하기 제출



let submitButton = document.getElementById('submit')

submitButton.addEventListener('click', function (e) {
  let isTrue = idveri && pwveri && pwchkveri && nameveri && emailveri;

  if (!isTrue) {
    e.preventDefault();
    document.querySelectorAll('input').forEach(function (input) {
      input.dispatchEvent(new Event('focusout'));
    })
  }
})


