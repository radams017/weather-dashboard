var cityBtn = $('#cityBtn');
var cityInput = $('#city');
var currentCityEl = $('#current-city')
var currentTempEl = $('#current-temp')
var currentWindEl = $('#current-wind')
var currentHumidEl = $('#current-humidity')
var currentUvEl = $('#current-uv')
var weatherContainEl = $('#weather-container');
var savedContainEl = $('#saved-container');
var locations = [];

function getWeatherByCity(city) {
    let apiKey = '5eaa9a8fe5356358abebebe6eae3d828';
    let apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?units=imperial&exclude=minutely,hourly,daily,alerts&q=' + city + '&appid=' + apiKey;

    fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (weatherCity) {
        console.log(weatherCity)
    });
};

function getWeatherByLat(lat, lon) {
    let apiKey = '5eaa9a8fe5356358abebebe6eae3d828'
    let apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?units=imperial&exclude=minutely,hourly,daily,alerts&lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
    
    fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (weatherRes) {
        return (weatherRes);
})};

function printWeather(weatherObj) {
    if (weatherObj.temp) {
        currentTempEl.textContent = weatherObj.temp;
    } if (weatherObj.wind) {
        currentWindEl.textContent = weatherObj.wind_speed;
    } if (weatherObj.humidity) {
        currentHumidEl.textContent = weatherObj.humidity;
    } if (weatherObj.uvi) {
        currentUvEl.textContent = weatherObj.uvi;
    }
};

function renderLocations() {
    savedContainEl.innerHTML = '';

    // for (var i = 0; i < locations.length; i++) {
    //     var location = locations[i];
    //     $('li').

        
    // }
}

function saveToStorage () {
    localStorage.setItem('locations', JSON.stringify(locations));
}

cityBtn.click((e) => {
    e.preventDefault();

    let locationVal = cityInput.val();

    locations.push(locationVal);
    cityInput.val('');

    saveToStorage();
    renderLocations();
})