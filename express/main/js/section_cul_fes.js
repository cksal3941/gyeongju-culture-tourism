// 문화재 스크립트

$(function () {
  $('.top-image-list').slick({
    autoplay: true,
    autoplaySpeed: 0,
    speed: 5000,
    arrows: false,
    swipe: false,
    slidesToShow: 3.5,
    cssEase: 'linear',
    pauseOnHover: true,
  });
});

$(function () {
  $('.bottom-image-list').slick({
    autoplay: true,
    autoplaySpeed: 0,
    speed: 5000,
    arrows: false,
    swipe: false,
    slidesToShow: 3.5,
    cssEase: 'linear',
    pauseOnHover: true,
    rtl : true,
  });
});




// 축제 section 스크립트

$(document).ready(function(){
  $('.poster-list').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    dots : true,
    arrows: true,
    pauseOnHover: true,
    speed : 2000,
    appendDots : $(".slide-btn"),
    prevArrow: $('.fes-prev'),
    nextArrow: $('.fes-next'),
    
  });
})