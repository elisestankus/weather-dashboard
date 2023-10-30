var zipInput = document.querySelector("#zipcodeInput");
var countryInput = document.querySelector('#countryInput');
var submitLocation = document.querySelector('#submitLocation');
var cityName = '';
var lat = 0;
var lon = 0;
var searchHistory = document.querySelector('#searchHistory')
var cityArray = [];
const cityObj = {
    cityName: '',
    lat: '',
    lon: ''
}


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
            cityName = data.name
            lat = data.lat
            lon = data.lon
            genNewCity()
            getWeather();
        })
        

}

function genNewCity() {
    var cityButton = document.createElement('button')
    cityButton.setAttribute('cityNameAtt', cityName)
    cityButton.textContent = cityName;
    searchHistory.appendChild(cityButton)

    var newCity = Object.create(cityObj);
    newCity.cityName = cityName;
    newCity.lat = lat;
    newCity.lon = lon;
    cityArray.push(newCity);
    localStorage.setItem('cityArray',JSON.stringify(cityArray))
    console.log(cityArray)
}

searchHistory.addEventListener('click', function(event) {
    var clickedButton = event.target;
    var cityNameAtt = clickedButton.getAttribute('cityNameAtt')
    var cityStore = JSON.parse(localStorage.getItem('cityArray'))
    for(i=0; i<cityStore.length; i++) {
        if (cityNameAtt == cityStore[i].cityName) {
            cityName = cityStore[i].cityName;
            lat = cityStore[i].lat;
            lon = cityStore[i].lon;
            console.log(cityStore[i])
            getWeather();
        }
  
    }
})

submitLocation.addEventListener('click', getLocation)

var todayWeather = document.querySelector("#todayWeather");

function getWeather() {
    var weatherQueryURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat +'&lon=' + lon + '&appid=' + APIKey + '&units=imperial';
    fetch(weatherQueryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var city = document.createElement('li');
            var todayTemp = document.createElement('li');
            var todayWind = document.createElement('li');
            var todayHumidity = document.createElement('li');
        

            city.textContent = cityName
            todayTemp.textContent = 'Current temp: ' + data.main.temp + ' °F'
            todayWind.textContent = 'Current wind: ' + data.wind.speed + ' miles/hour'
            todayHumidity.textContent = 'Current humidity: ' + data.main.humidity + '%'

            todayWeather.appendChild(city);
            todayWeather.appendChild(todayTemp);
            todayWeather.appendChild(todayWind);
            todayWeather.appendChild(todayHumidity);
})
}