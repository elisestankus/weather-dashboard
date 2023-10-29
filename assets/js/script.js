var zipInput = document.querySelector("#zipcodeInput");
var countryInput = document.querySelector('#countryInput');
var submitLocation = document.querySelector('#submitLocation');
var lat = 0;
var lon = 0;


function getLocation(event) {
    event.preventDefault();
    var zip = zipInput.value
    var country = countryInput.value
    console.log(zip)
    console.log(country)
    var geoQueryURL = 'http://api.openweathermap.org/geo/1.0/zip?zip=' + zip + ',' + country + '&appid=' + APIKey
    fetch(geoQueryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            lat = data.lat
            lon = data.lon
            console.log(data.name)
            console.log(data.lat)
            console.log(data.lon)
            console.log(lat)
            console.log(lon)
            getWeather();
        })
        

}

submitLocation.addEventListener('click', getLocation)

var todayWeather = document.querySelector("#todayWeather");

function getWeather() {
    var weatherQueryURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat +'&lon=' + lon + '&appid=' + APIKey + '&units=imperial';
    fetch(weatherQueryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var todayTemp = document.createElement('li');
            var todayWind = document.createElement('li');
            var todayHumidity = document.createElement('li');
        

            todayTemp.textContent = 'Current temp: ' + data.main.temp + ' °F'
            todayWind.textContent = 'Current wind: ' + data.wind.speed + ' miles/hour'
            todayHumidity.textContent = 'Current humidity: ' + data.main.humidity + '%'

            todayWeather.appendChild(todayTemp);
            todayWeather.appendChild(todayWind);
            todayWeather.appendChild(todayHumidity);
})
}