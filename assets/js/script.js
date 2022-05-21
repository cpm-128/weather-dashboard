var apiKey = "943c2d97f00c4a3d1e9383c1afac4cc1";
var userFormEl = document.querySelector("#location-form");
var userCityNameEl = document.querySelector("#cityName");
var currentWeatherContainerEl = document.querySelector("#currentWeatherHeading");
var currentWeatherDetailsContainerEl = document.querySelector("#currentWeatherDetails");
var forecastLength = 5;


var getWeatherCurrent = function(cityName) {

    // format the api url
    var apiCurrentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&Appid=" + apiKey + "&units=imperial";
    console.log(apiCurrentWeatherUrl);
    // make a request to the url
    fetch(apiCurrentWeatherUrl)
        .then(function(response) {
            if(response.ok) {
                let res = response;
                response.json().then(function(data) {
                response.name
                var iconCode = data.weather[0].icon;
                var currentTemp = data.main.temp;
                var windspeed = data.wind.speed;
                var humidity = data.main.humidity;
                var timeZoneShiftUTC = data.timezone;

                // append heading items to page
                var cityEl = document.createElement("h2");
                    cityEl.textContent = cityName.toUpperCase();
                    cityEl.setAttribute("class" , "p-2 bd-highlight");
                    currentWeatherContainerEl.append(cityEl);
                var dateEl = document.createElement("h2");
                    var timeZoneShiftHours = timeZoneShiftUTC/60/60;
                        var localTime = moment.utc().utcOffset(timeZoneShiftHours).format("LLL");
                    dateEl.textContent = localTime;
                    dateEl.setAttribute("class" , "p-2 bd-highlight");
                    currentWeatherContainerEl.append(dateEl);
                var conditionEl = document.createElement("img");
                    var weatherConditionIconUrl = ("https://openweathermap.org/img/w/" + iconCode + ".png");
                    conditionEl.setAttribute("src" , weatherConditionIconUrl);
                    conditionEl.setAttribute("class" , "p-2 bd-highlight");
                    currentWeatherContainerEl.append(conditionEl);

                // append details items to page
                var tempEl = document.createElement("p");
                    tempEl.textContent = "Temp: " + currentTemp + "°F";
                    currentWeatherDetailsContainerEl.append(tempEl);
                var windEl = document.createElement("p");
                    windEl.textContent = "Wind: " + windspeed + "mph";
                    currentWeatherDetailsContainerEl.append(windEl);
                var humidityEl = document.createElement("p");
                    humidityEl.textContent = "Humidity: " + humidity + "%";
                    currentWeatherDetailsContainerEl.append(humidityEl);
                var UVindexEl = document.createElement("p");
                    UVindexEl.textContent = "Nobody knows";
            })
        }})
};

var getWeatherForecast = function(cityName) {

    // format the api url
    var apiFiveDayWeatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&Appid=" + apiKey + "&units=imperial";

    // make a request to the url
    fetch(apiFiveDayWeatherUrl)
        .then(function(response) {
            if(response.ok) {
                let res = response;
                response.json().then(function(data) {
                    response.name
                    for (var i = 0; i < forecastLength; i++) {
                        // get the variable from the array/object for each day
                        // append to classi so that we make a new forecast card for each day
                        // the forcast cards should all be flex columns, may col-2 with space between
                    };
                    var humidity = data.list[1].main.humidity;
                })
            }
        })
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var cityName = userCityNameEl.value.trim();

    if (cityName) {
        getWeatherCurrent(cityName);
        getWeatherForecast(cityName);
        userCityNameEl.value = "";
    } else {
        alert("Please enter a city.");
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);