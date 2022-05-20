var apiKey = "943c2d97f00c4a3d1e9383c1afac4cc1";
var userFormEl = document.querySelector("#location-form");
var userCityNameEl = document.querySelector("#cityName");

var apiFiveDayWeatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&Appid=" + apiKey + "&units=imperial";


var getWeather = function(cityName) {
    //format the api url
    var apiCurrentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&Appid=" + apiKey + "&units=imperial";
        // console.log("current weather >>>", apiCurrentWeatherUrl);
    // make a request to the url
    fetch(apiCurrentWeatherUrl)
        .then(function(response) {
            if(response.ok) {
                let res = response;
                response.json().then(function(data) {
                response.name
                // date
                var iconCode = data.weather[0].icon;
                var currentTemp = data.main.temp;
                var windspeed = data.wind.speed;
                var humidity = data.main.humidity;
                var timeZoneShiftUTC = data.timezone;
                console.log(">>>" , iconCode);
            })
        }});
};


var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var cityName = userCityNameEl.value.trim();

    if (cityName) {
        getWeather(cityName);
        userCityNameEl.value = "";
    } else {
        alert("Please enter a city.");
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);