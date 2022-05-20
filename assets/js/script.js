var apiKey = "943c2d97f00c4a3d1e9383c1afac4cc1";
var userFormEl = document.querySelector("#location-form");
var userCityNameEl = document.querySelector("#cityName");
var userStateCodeEl = document.querySelector("#stateCode");
var userCountryCodeEl = document.querySelector("#countryCode");

// ** hardcorded placeholders
var cityName = "Bohemia";
var stateCode = "Ny";
var countryCode = "USA";

// ** hardcoded placeholders
var lat = 33.44;
var lon = -94.04;

var apiWeatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=" + apiKey;
// var getWeatherData = function (lat, lon) { etc...
// };
// getWeatherData(lat, lon)


var getCoordData = function() {
    //format the api url
    var apiCoordUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + stateCode + "," + countryCode + "&appid=" + apiKey;

    // make a request to the url
    fetch(apiCoordUrl)
        .then(function(response) {
            response.json().then(function(data) {
                console.log(">>> data >>>" , data);
            });
        });
    // get the lat and lon values from here and return for getWeatherData()
    };

var formSubmitHandler = function(event) {
    event.preventDefault();
    console.log(event);
};

userFormEl.addEventListener("submit", formSubmitHandler);
