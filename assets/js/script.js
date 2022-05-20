var apiKey = "943c2d97f00c4a3d1e9383c1afac4cc1";
var userFormEl = document.querySelector("#location-form");
var userCityNameEl = document.querySelector("#cityName");
var userStateCodeEl = document.querySelector("#stateCode");
var userCountryCodeEl = document.querySelector("#countryCode");


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
    // get value from input element
    var cityName = userCityNameEl.value.trim();
    var stateCode = userStateCodeEl.value.trim();
    var countryCode = userCountryCodeEl.value.trim();

    if (cityName, stateCode, countryCode) {
        getCoordData(cityName, stateCode, countryCode);
        userCityNameEl.value = "";
        userStateCodeEl.value = "";
        userCountryCodeEl.value = "";
    } else {
        alert("Please enter a city, two-digit state code (USA only), and three-digit country code.");
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);
