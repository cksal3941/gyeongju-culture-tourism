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

$(".gnb-list").hover(function () {
  $(this).find("ul").stop().slideDown();
  $(this).find("ul").addClass("active")
}, function () {
  $(this).find("ul").stop().slideUp();
  $(this).find("ul").removeClass("active")
})

// 지도를 생성합니다

// 지도 api
// 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
var placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 }),
  contentNode = document.createElement('div'), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다 
  markers = [], // 마커를 담을 배열입니다
  currCategory = ''; // 현재 선택된 카테고리를 가지고 있을 변수입니다

var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(35.85628, 129.22479), // 지도의 중심좌표
    level: 5, // 지도의 확대 레벨
  };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 마커가 표시될 위치입니다
var markerPosition = new kakao.maps.LatLng(35.85628, 129.22479);

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
  position: markerPosition,
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);

// 아래 코드는 지도 위의 마커를 제거하는 코드입니다
// marker.setMap(null);

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places(map);

// 지도에 idle 이벤트를 등록합니다`
kakao.maps.event.addListener(map, "idle", searchPlaces);

// 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다
contentNode.className = "placeinfo_wrap";

// 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
// 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다
addEventHandle(contentNode, "mousedown", kakao.maps.event.preventMap);
addEventHandle(contentNode, "touchstart", kakao.maps.event.preventMap);

// 커스텀 오버레이 컨텐츠를 설정합니다
placeOverlay.setContent(contentNode);

// 각 카테고리에 클릭 이벤트를 등록합니다
addCategoryClickEvent();

// 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
function addEventHandle(target, type, callback) {
  if (target.addEventListener) {
    target.addEventListener(type, callback);
  } else {
    target.attachEvent("on" + type, callback);
  }
}

// 카테고리 검색을 요청하는 함수입니다
function searchPlaces() {
  if (!currCategory) {
    return;
  }

  // 커스텀 오버레이를 숨깁니다
  placeOverlay.setMap(null);

  // 지도에 표시되고 있는 마커를 제거합니다
  removeMarker();

  ps.categorySearch(currCategory, placesSearchCB, { useMapBounds: true });
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
    displayPlaces(data);
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
  } else if (status === kakao.maps.services.Status.ERROR) {
    // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
  }
}

// 지도에 마커를 표출하는 함수입니다
function displayPlaces(places) {
  // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
  // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
  var order = document.getElementById(currCategory).getAttribute("data-order");

  for (var i = 0; i < places.length; i++) {
    // 마커를 생성하고 지도에 표시합니다
    var marker = addMarker(new kakao.maps.LatLng(places[i].y, places[i].x), order);

    // 마커와 검색결과 항목을 클릭 했을 때
    // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
    (function (marker, place) {
      kakao.maps.event.addListener(marker, "click", function () {
        displayPlaceInfo(place);
      });
    })(marker, places[i]);
  }
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, order) {
  var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
    imageSize = new kakao.maps.Size(27, 28), // 마커 이미지의 크기
    imgOptions = {
      spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
      spriteOrigin: new kakao.maps.Point(46, order * 36), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
      offset: new kakao.maps.Point(11, 28), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    },
    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
    marker = new kakao.maps.Marker({
      position: position, // 마커의 위치
      image: markerImage,
    });

  marker.setMap(map); // 지도 위에 마커를 표출합니다
  markers.push(marker); // 배열에 생성된 마커를 추가합니다

  return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

// 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
function displayPlaceInfo(place) {
  var content =
    '<div class="placeinfo">' +
    '   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">' + place.place_name + "</a>";

  if (place.road_address_name) {
    content += '    <span title="' + place.road_address_name + '">' + place.road_address_name + "</span>" +
      '  <span class="jibun" title="' + place.address_name + '">(지번 : ' + place.address_name + ")</span>";
  } else {
    content += '    <span title="' + place.address_name + '">' + place.address_name + "</span>";
  }

  content += '    <span class="tel">' + place.phone + "</span>" +
    "</div>" +
    '<div class="after"></div>';

  contentNode.innerHTML = content;
  placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
  placeOverlay.setMap(map);
}

// 각 카테고리에 클릭 이벤트를 등록합니다
function addCategoryClickEvent() {
  var category = document.getElementById("category"),
    children = category.children;

  for (var i = 0; i < children.length; i++) {
    children[i].onclick = onClickCategory;
  }
}

// 카테고리를 클릭했을 때 호출되는 함수입니다
function onClickCategory() {
  var id = this.id,
    className = this.className;

  placeOverlay.setMap(null);

  if (className === "on") {
    currCategory = "";
    changeCategoryClass();
    removeMarker();
  } else {
    currCategory = id;
    changeCategoryClass(this);
    searchPlaces();
  }
}

// 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
function changeCategoryClass(el) {
  var category = document.getElementById("category"),
    children = category.children,
    i;

  for (i = 0; i < children.length; i++) {
    children[i].className = "";
  }

  if (el) {
    el.className = "on";
  }
}



// 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomIn() {
  map.setLevel(map.getLevel() - 1);
}

// 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomOut() {
  map.setLevel(map.getLevel() + 1);
}




function panTo() {
  // 이동할 위도 경도 위치를 생성합니다 
  var moveLatLon = new kakao.maps.LatLng(35.85628, 129.22479);

  // 지도 중심을 부드럽게 이동시킵니다
  // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
  map.panTo(moveLatLon);
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


