var cityBtn = $('#cityBtn');
var cityInput = $('#city');
var currentCityEl = $('#')
var currentTempEl = $('#current-temp')
var currentWindEl = $('#current-wind')
var weatherContainEl = $('#weather-container');
var savedContainEl = $('#saved-container');

function getWeatherByLat(lat, lon) {
    let apiKey = '5eaa9a8fe5356358abebebe6eae3d828'
    let apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?units=imperial&exclude=minutely,hourly,daily,alerts&lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
    
    fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (weatherRes) {
        console.log(weatherRes);
})};

function printWeather(weatherObj) {
    if (weatherObj.temp) {
        currentTempEl.textContent = weatherObj.temp;
    } if (weatherObj.wind) {
        currentWindEl.textContent = weatherObj.wind_speed;
    } if ()
};


cityBtn.click(getWeather)