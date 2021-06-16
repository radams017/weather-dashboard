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

function printWeather(weather) {  
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

function saveToStorage () {
    localStorage.setItem('locations', JSON.stringify(locations));
}

// cityBtn.click(() => getWeatherByLat(34, 92))

function saveCity() {
    let locationVal = cityInput.val();

    locations.push(locationVal);
    cityInput.val('');

    saveToStorage();
    renderLocations();
};

cityBtn.click(() => {
    const citySearch = cityInput.val();
    foundCity = usa_cities.find(city => city.name == citySearch);
    if(!foundCity) {
       return alert('City Not Found');
    } 
    getWeatherByCoords(foundCity.coord.lat, foundCity.coord.lon, printWeather);
})