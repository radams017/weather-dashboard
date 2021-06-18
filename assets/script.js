var cityBtn = $('#cityBtn');
var cityInput = $('#city');
var savedContainEl = $('#saved-container');
var locations = [];

var foundCity = null;

async function getWeatherByCoords(lat, lon, display) {
    let apiKey = '5eaa9a8fe5356358abebebe6eae3d828'
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?units=imperial&exclude=minutely,hourly,daily,alerts&lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (weatherRes) {
     if (typeof display == 'function') {
         display(weatherRes)};
})};

function displayWeather(weather) {  
    $('#weather-container').empty().append(`
    <div id="current-weather">
                <h2 id="current-city">${foundCity.name}</h2>
                </br>
                <h3 id="current-date"></h3>
                </br>
                <h3 id="current-temp">Temp: ${weather.current.temp}</h3>
                </br>
                <h3 id="current-wind">Wind Speed: ${weather.current.wind_speed}</h3>
                </br>
                <h3 id="current-humidity">Humidity: ${weather.current.humidity}</h3>
                </br>
                <h3 id="current-uv">UV Index: ${weather.current.uvi}</h3>
            </div>
    `)
};

function saveCityToStorage(city) {
    locations.push(city);
    localStorage.setItem('locations', JSON.stringify(locations));
};

function loadLocationsFromStorage() {
    locations = JSON.parse(localStorage.getItem('locations'))
}

function displaySavedCities(cities){
    savedContainEl.empty();
    cities.forEach(location => {
        savedContainEl.append(`
        <li><button class="btn btn-outline-dark mb-2" id="savedCity-${location.id}" onclick="searchSavedCity(${location.id})">${location.name}</button></li>
        `)
    })
}

function searchSavedCity(id) {
    const cityName = $(`#savedCity-${id}`)[0].innerHTML
    getCityWeather(cityName)
}

function getCityWeather(cityName){
    foundCity = usa_cities.find(city => city.name == cityName);
    if(!foundCity) {
       return alert('City Not Found');
    } 
    getWeatherByCoords(foundCity.coord.lat, foundCity.coord.lon, displayWeather)
    return foundCity
}

cityBtn.click(() => {
    const citySearch = cityInput.val();
    const foundCity = getCityWeather(citySearch)
    cityInput.val('');
    saveCityToStorage(foundCity);
    displaySavedCities(locations);
})

$(document).ready(() => {
    if(foundCity != null){
    loadLocationsFromStorage()
    displaySavedCities(locations)
    }
});