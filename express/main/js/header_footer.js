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
  $(".menu-buttons div, a, i").css('color', '#000');
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
  $(".menu-buttons div, a, i").css('color', '#fff');
  $(".menu-buttons img").attr("src", "../Project-images/header/home-white.png");
  $(this).find(".ul-wrapper").stop().fadeOut(500);
  $(this).find(".submenu-left-img").stop().fadeOut(500);
});



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


// 이미지 슬라이드
// $('.slider > .img-item:gt(0)').hide();
// setInterval(() => {
//     $('.slider .img-item:first-child').fadeTo(1000, 0)
//         .next('.img-item').fadeTo(1000, 1)
//         .end(1000).appendTo('.slider')
// }, 5000);

$(document).ready(function () {
  $('.slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
  })
});

if ($('.menu-buttons ul').find('.logout').length !== 0) {
  $('.menu-buttons ul').css({ 'min-width': '200px' })
} else {
  $('.menu-buttons ul').css({ 'min-width': '150px' })
}



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