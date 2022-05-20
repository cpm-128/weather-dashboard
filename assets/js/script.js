var apiKey = "943c2d97f00c4a3d1e9383c1afac4cc1";
var userFormEl = document.querySelector("#location-form");
var userCityNameEl = document.querySelector("#cityName");
var userStateCodeEl = document.querySelector("#stateCode");
var userCountryCodeEl = document.querySelector("#countryCode");

// var getWeatherData = function (lat, lon) {
//     console.log(">>> data >>>" , data, ">>> lat >>>" , lat , ">>> lon >>>");
//     var apiWeatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=" + apiKey;
//     console.log(">>> apiWeatherUrl >>>", apiWeatherUrl);
// };


var getCoordData = function(cityName, stateCode, countryCode) {
    //format the api url
    var apiCoordUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + stateCode + "," + countryCode + "&appid=" + apiKey;
        console.log("apiCoordUrl >>>", apiCoordUrl)
    // make a request to the url
    fetch(apiCoordUrl)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                var lat = data.lat;
                var lon = data.lon;
                console.log(">>> lat >>>", lat , ">>> lon >>>" , lon);
                getWeatherData(lat, lon);
            })
        }});
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