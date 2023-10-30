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
            genNewCity();
            getWeather();
            getForecast();
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
            getForecast();
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
            var todayCity = document.querySelector('#todayCity');
            var todayTemp = document.querySelector('#todayTemp');
            var todayWind = document.querySelector('#todayWind');
            var todayHumidity = document.querySelector('#todayHumidity');
        

            todayCity.textContent = cityName + ' (' + dayjs().format('M/D/YYYY') + ')'
            todayTemp.textContent = data.main.temp + ' °F'
            todayWind.textContent = data.wind.speed + ' miles/hour'
            todayHumidity.textContent = data.main.humidity + '%'

})
}

function getForecast() {
    var forecastQueryURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey + '&units=imperial'
    fetch(forecastQueryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var date0 = document.querySelector('#day0Date');
            var date1 = document.querySelector('#day1Date');
            var date2 = document.querySelector('#day2Date');
            var date3 = document.querySelector('#day3Date');
            var date4 = document.querySelector('#day4Date');

            date0.textContent = dayjs().add(1, 'day').format('M/D/YYYY')
            date1.textContent = dayjs().add(2, 'day').format('M/D/YYYY')
            date2.textContent = dayjs().add(3, 'day').format('M/D/YYYY')
            date3.textContent = dayjs().add(4, 'day').format('M/D/YYYY')
            date4.textContent = dayjs().add(5, 'day').format('M/D/YYYY')
            
            var day0Temp = document.querySelector('#day0Temp');
            var day0Wind = document.querySelector('#day0Wind');
            var day0Humidity = document.querySelector('#day0Humidity');

            day0Temp.textContent = data.list[0].main.temp + ' °F'
            day0Wind.textContent = data.list[0].wind.speed + 'miles/hour'
            day0Humidity.textContent = data.list[0].main.humidity + '%'


            for (i=1; i<5;i++) {
                document.querySelector('#day'+i+'Temp').textContent = data.list[(i*8) - 1].main.temp + ' °F'
                document.querySelector('#day'+i+'Wind').textContent = data.list[(i*8) - 1].wind.speed + ' miles/hour'
                document.querySelector('#day'+i+'Humidity').textContent = data.list[(i*8) - 1].main.humidity + '%'
            }
            

        })
}

