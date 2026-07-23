
// 날씨 API
$.getJSON('https://api.openweathermap.org/data/2.5/weather?q=Seoul&limit=5&appid=1255e4aac90af2ff4a1905e43962ab4b&units=metric', function (result) {
    $(".temp").append(Math.ceil(result.main.temp));
    let wiconUrl = '<img src="https://openweathermap.org/img/wn/' + result.weather[0].icon + '.png" alt="' + result.weather[0].description + '">';
    $(".weather-icon").html(wiconUrl);
});

// 미세먼지 API (서버 프록시를 통해 호출)
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