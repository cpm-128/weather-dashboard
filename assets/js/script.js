var apiKey = "943c2d97f00c4a3d1e9383c1afac4cc1";
var userFormEl = document.querySelector("#location-form");
var userCityNameEl = document.querySelector("#cityName");
var currentWeatherContainerEl = document.querySelector("#currentWeatherHeading");

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
                // var date
                var iconCode = data.weather[0].icon;
                var currentTemp = data.main.temp;
                var windspeed = data.wind.speed;
                var humidity = data.main.humidity;
                var timeZoneShiftUTC = data.timezone;
                console.log(">>>" , iconCode);

                // append items to page
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
                var conditionEl
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