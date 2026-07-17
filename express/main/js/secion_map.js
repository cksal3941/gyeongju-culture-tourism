$(".slide-wrap1").slick({
  dots: true,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,


  customPaging: function (slider, i) {
      var title = $(slider.$slides[i]).data('title');
      var num = i + 1;
      return '<a class="item-dot"> <span>' + [i + 1] + '</span>' + title + ' </a>'

  },
  

});


// tap
let slickPage = $(".slide-wrap1")
let btn = $('.tab-btn');
let btnlen = $('.tab-btn').length;
let mapImg = $(".map-img img")

console.log(mapImg)
for (let i = 0; i < btnlen; i++) {
  btn.eq(i).on('click', function () {
      btn.removeClass('active');
      btn.eq(i).addClass('active');
      slickPage.removeClass("out");
      slickPage.eq(i).addClass("out");
      slickPage.resize(); // 팝업 열때 슬라이드 깨짐 방지
      slickPage.slick('refresh'); // 팝업 열때 슬라이드 깨짐 방지
      if(slickPage.hasClass('out')){
        mapImg.attr('src',`../Project-images/section_map/back${i+1}.png`)
      }
      $(".slide-wrap1 .slick-prev").html("<i class='fa-solid fa-chevron-left'></i>")
      $(".slide-wrap1 .slick-next").html("<i class='fa-solid fa-chevron-right'></i>")
  });
}

// 화살표

$(".slide-wrap1 .slick-prev").html("<i class='fa-solid fa-chevron-left'></i>")
$(".slide-wrap1 .slick-next").html("<i class='fa-solid fa-chevron-right'></i>")