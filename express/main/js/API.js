
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
var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'7gpEZV105Yp6x9Fq7q3wadEQtdMDnJ5YUCi86TMqXyp1l3ox8sh7vZaN1%2BV6rNe%2BuoSVktxWkKtR4%2B%2F0CQZGwQ%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('json'); /* 응답 데이터 타입 설정 */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /* 한 페이지 결과 수 */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* 페이지 번호 설정 */
queryParams += '&' + encodeURIComponent('sidoName') + '=' + encodeURIComponent('경북'); /* 조회 할 데이터 시도 이름 설정*/
queryParams += '&' + encodeURIComponent('searchCondition') + '=' + encodeURIComponent('DAILY'); /* 데이터 기간 */

xhr.open('GET', url + queryParams);

function updateData(){
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) { 
      if(this.status === 200) { 
        let responsData = JSON.parse(this.responseText);
  
        if(responsData.response.body.items) {
          let items = responsData.response.body.items;
          // console.log(items)
  
          let dataDisplay = document.getElementById('data');
          let latestData = null;

          for(let i = 0; i < items.length; i++) {
            let item = items[i];
  
            if(item.cityName == '경주시') {
              if(!latestData || item.dataTime > latestData.dataTime ) {
                latestData = item;
                // console.log(latestData)

                //미세먼지 농도별 예보 
                if (item.pm10Value <= 30) {
                  item.pm10Value = '좋음'
                  console.log=('좋음')
                } else if (item.pm10Value <= 80) {
                  item.pm10Value = '보통'
                  console.log=('보통')
                }else if (item.pm10Value <= 150) {
                  item.pm10Value = '나쁨'
                  console.log=('나쁨')
                }else {
                  item.pm10Value = '매우나쁨'
                  console.log=('매우나쁨')
                };

                let dataItem = document.createElement('div');
                dataItem.innerHTML =  '미세먼지 ' + item.pm10Value;
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