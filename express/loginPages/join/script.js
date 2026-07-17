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
  $(".temp").append(Math.ceil(result.main.temp)); //현재온도

  // 현재온도 아이콘
  let wiconUrl = '<img src="http://openweathermap.org/img/wn/' + result.weather[0].icon + '.png" alt="' + result.weather[0].description + '">';
  $(".weather-icon").html(wiconUrl);
})

// 미세먼지 API

var xhr = new XMLHttpRequest();

var url = 'http://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureSidoLIst'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + '7gpEZV105Yp6x9Fq7q3wadEQtdMDnJ5YUCi86TMqXyp1l3ox8sh7vZaN1%2BV6rNe%2BuoSVktxWkKtR4%2B%2F0CQZGwQ%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('json'); /* 응답 데이터 타입 설정 */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /* 한 페이지 결과 수 */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* 페이지 번호 설정 */
queryParams += '&' + encodeURIComponent('sidoName') + '=' + encodeURIComponent('경북'); /* 조회 할 데이터 시도 이름 설정*/
queryParams += '&' + encodeURIComponent('searchCondition') + '=' + encodeURIComponent('DAILY'); /* 데이터 기간 */

xhr.open('GET', url + queryParams);

function updateData() {
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status === 200) {
        let responsData = JSON.parse(this.responseText);

        if (responsData.response.body.items) {
          let items = responsData.response.body.items;
          // console.log(items)

          let dataDisplay = document.getElementById('data');
          let latestData = null;

          for (let i = 0; i < items.length; i++) {
            let item = items[i];

            if (item.cityName == '경주시') {
              if (!latestData || item.dataTime > latestData.dataTime) {
                latestData = item;
                // console.log(latestData)

                //미세먼지 농도별 예보 
                if (item.pm10Value <= 30) {
                  item.pm10Value = '좋음'
                  console.log = ('좋음')
                } else if (item.pm10Value <= 80) {
                  item.pm10Value = '보통'
                  console.log = ('보통')
                } else if (item.pm10Value <= 150) {
                  item.pm10Value = '나쁨'
                  console.log = ('나쁨')
                } else {
                  item.pm10Value = '매우나쁨'
                  console.log = ('매우나쁨')
                };

                let dataItem = document.createElement('div');
                dataItem.innerHTML = '미세먼지 ' + item.pm10Value;
                // dataItem.innerHTML = item.cityName + '미세먼지 : ' + latestData.pm10Value + latestData.dataTime;
                dataDisplay.appendChild(dataItem);
              }
            }
          }
        } else {
          console.log('데이터 구조 다시 확인바람')
        }
      } else {
        console.log('HTTP 요청 실패' + this.status)
      }
    }
  };
  xhr.send('');
}

updateData();

setInterval(updateData, 3600000)

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


let idveri = pwveri = pwchkveri = nameveri = phoneveri = emailveri = false;

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


// 성별
let genderInputs = document.querySelectorAll('.gender input');

genderInputs.forEach(function (item) {
  item.addEventListener('click', function () {
    this.querySelector('input[type="radio"]').checked = true;
    genderveri = true;
  })
})


// 휴대전화

let numWarn = document.querySelector('.phone .warn');
let phoneInputs = document.querySelectorAll('.phone input');

$('.phone input').focusout(function () {
  // console.log($('.phone2').val());

  let phoneExp = /^\d{3,4}$/;;
  let phone2Val = $('.phone2').val();
  let phone3Val = $('.phone3').val();

  // console.log(phone2Val, phone3Val);

  if ($('.phone2').val().length == 0 || $('.phone3').val().length == 0) {
    numWarn.innerHTML = essenInfo;

  } else if (!phoneExp.test(phone2Val) || !phoneExp.test(phone3Val)) {
    $('.phone .warn').html('<span class="text-red"> 형식에 맞지않는 번호입니다. </span>');
  } else {
    phoneveri = true;
    numWarn.empty();
  }
})




/********************
 * 우편번호 api 연결 *
 *******************/

function sample6_execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ''; // 주소 변수
      var extraAddr = ''; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else { // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === 'R') {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        document.getElementById("sample6_extraAddress").value = extraAddr;

      } else {
        document.getElementById("sample6_extraAddress").value = '';
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById('sample6_postcode').value = data.zonecode;
      document.getElementById("sample6_address").value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById("sample6_detailAddress").focus();
    }
  }).open();
}


// 가입하기 제출



let submitButton = document.getElementById('submit')

submitButton.addEventListener('click', function (e) {
  let isTrue = idveri && pwveri && pwchkveri && nameveri && phoneveri && emailveri;

  if (!isTrue) {
    e.preventDefault();
    document.querySelectorAll('input').forEach(function (input) {
      input.dispatchEvent(new Event('focusout'));
    })
  }
})


