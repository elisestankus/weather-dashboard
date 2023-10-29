var todayWeather = document.querySelector("#todayWeather");
var lat = 37.91
var lon = -122.06
var queryURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat +'&lon=' + lon + '&appid=' + APIKey + '&units=imperial';

fetch(queryURL)
    .then(function (response) {
       return response.json();
    })