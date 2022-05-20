var apiKey = "943c2d97f00c4a3d1e9383c1afac4cc1";

var cityName = "Bohemia";
var stateCode = "Ny";
var countryCode = "USA";

apiCoordUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + stateCode + "," + countryCode + "&appid=" + apiKey;
console.log(apiCoordUrl);

var lat = 33.44;
var lon = -94.04;

apiWeatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=" + apiKey;
console.log(apiWeatherURL);

