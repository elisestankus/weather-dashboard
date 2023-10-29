var zipInput = document.querySelector("#zipcodeInput");
var countryInput = document.querySelector('#countryInput');

var geoQueryURL = 'http://api.openweathermap.org/geo/1.0/zip?zip=' + zipInput.value + ',' + countryInput.value + '&appid=' + APIkey


var todayWeather = document.querySelector("#todayWeather");
var lat = 37.91
var lon = -122.06
var queryURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat +'&lon=' + lon + '&appid=' + APIKey + '&units=imperial';

fetch(queryURL)
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