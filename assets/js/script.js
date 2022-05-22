var apiKey = "943c2d97f00c4a3d1e9383c1afac4cc1";
var userFormEl = document.querySelector("#location-form");
var userCityNameEl = document.querySelector("#cityName");
var currentWeatherEntireEl = document.querySelector("#currentWeather");
var currentWeatherContainerEl = document.querySelector("#currentWeatherHeading");
var currentWeatherDetailsContainerEl = document.querySelector("#currentWeatherDetails");
var forecastLength = 5;
var forecastContainerEl = document.querySelector("#forecast");
var cities = [];
var searchHistoryListEl = document.querySelector("#searchHistoryList");
var searchHistoryEl = document.querySelector("#searchHistory");
var clearSearchHistoryEl = document.querySelector("#clearSearchHistory");

// display dynamically defined city on page load
document.addEventListener('DOMContentLoaded', function() {
    var cityName = "brevard";
    getWeatherCurrent(cityName);
    getWeatherForecast(cityName);
    loadSearch(cityName);
})

var getWeatherCurrent = function(cityName) {
    // style display box
    currentWeatherEntireEl.setAttribute("class","border");

    // format the api url
    var apiCurrentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&Appid=" + apiKey + "&units=imperial";
        // console.log(apiCurrentWeatherUrl);
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
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                // console.log(">> lat" , lat , ">> lon" , lon);

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
                    windEl.textContent = "Wind: " + windspeed + " mph";
                    currentWeatherDetailsContainerEl.append(windEl);
                var humidityEl = document.createElement("p");
                    humidityEl.textContent = "Humidity: " + humidity + "%";
                    currentWeatherDetailsContainerEl.append(humidityEl);

                // api for UV index
                var apiUvIndexURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,daily,alerts&appid=" + apiKey + "&units=imperial";
                    // console.log(apiUvIndexURL);
                    //make a request to the url
                    fetch(apiUvIndexURL)
                        .then(function(response) {
                            if(response.ok) {
                                let res = response;
                                response.json().then(function(data) {
                                response.name
                                var UVindex = data.current.uvi;

                                // create the elements
                                var UVindexEl = document.createElement("p");
                                    UVindexEl.setAttribute("class" , "d-inline")
                                    UVindexEl.textContent = "UV Index: ";
                                var UVindexMeasurementEl = document.createElement("p");
                                    UVindexMeasurementEl.textContent = UVindex;

                                // apply color codes
                                if (UVindex <= 2) {
                                    UVindexMeasurementEl.setAttribute("class" , "uv-index-low d-inline")
                                } else if (UVindex > 2 && UVindex <= 5) {
                                    UVindexMeasurementEl.setAttribute("class" , "uv-index-moderate d-inline")
                                } else if (UVindex > 5 && UVindex <= 7) {
                                    UVindexMeasurementEl.setAttribute("class" , "uv-index-high d-inline")
                                } else if (UVindex > 7 && UVindex <= 10) {
                                    UVindexMeasurementEl.setAttribute("class" , "uv-index-vhigh d-inline")
                                } else if (UVindex > 11) {
                                    UVindexMeasurementEl.setAttribute("class" , "uv-index-extreme d-inline")
                                };

                                // append this to heading item page
                                currentWeatherDetailsContainerEl.append(UVindexEl);
                                UVindexEl.append(UVindexMeasurementEl);
                                });
                            };
                        });
                // end UV index

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
                        var forecastCardEl = document.createElement("div");
                            forecastCardEl.setAttribute("id" , "forecastCardEl"+i);
                            forecastCardEl.setAttribute("class", "forecastCard col-12 col-md-2 font-weight-bold");
                            forecastContainerEl.append(forecastCardEl);
                        var dateEl = document.createElement("p");
                            dateEl.textContent = moment().add(i+1, "days").format("L");
                            forecastCardEl.append(dateEl);
                        var iconEl = document.createElement("img");
                            var iconCode = data.list[i].weather[0].icon;
                            var iconUrl = ("https://openweathermap.org/img/w/" + iconCode + ".png");
                            iconEl.setAttribute("src" , iconUrl);
                            forecastCardEl.append(iconEl);
                        var tempEl = document.createElement("p");
                            tempEl.textContent = "Temp: " + data.list[i].main.temp + "°F";
                            forecastCardEl.append(tempEl);
                        var windEl = document.createElement("p");
                            windEl.textContent = "Wind: " + data.list[i].wind.speed + " mph";
                            forecastCardEl.append(windEl);
                        var humidityEl = document.createElement("p")
                            humidityEl.textContent = "Humidity: " + data.list[1].main.humidity + "%";
                            forecastCardEl.append(humidityEl);
                    };
                })
            }
        })
};

var formSubmitHandler = function(event) {
    event.preventDefault();

    // get value from input element
    var cityName = userCityNameEl.value.trim();

    if (cityName) {

        // reset containers to be blank to remove previous search display
        currentWeatherContainerEl.innerHTML = "";
        currentWeatherDetailsContainerEl.innerHTML = "";
        forecastContainerEl.innerHTML = "";

        getWeatherCurrent(cityName);
        getWeatherForecast(cityName);
        userCityNameEl.value = "";
        cities.unshift({cityName});
    } else {
        alert("Please enter a city.");
    }
    saveSearch();
    loadSearch(cityName);
};

var saveSearch = function() {
    localStorage.setItem("cities", JSON.stringify(cities))
};

var loadSearch = function() {

    // reset button list
    searchHistoryListEl.innerHTML = "";

    // get from localStorage . . . . . . this actually breaks it
    //cities = JSON.parse(localStorage.getItem("cities"));

    // print on page
    for (var i = 0; i < cities.length; i++) {
        // console.log(">>>", cities.length);
        var oldSearchEl = document.createElement("button");
            oldSearchEl.textContent = cities[i].cityName;
            oldSearchEl.setAttribute("class" , "d-flex w-100 btn border p-2 historyBtn");
            oldSearchEl.setAttribute("type" , "submit");
            searchHistoryListEl.append(oldSearchEl);
            // the button needs to have the cityName input
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);

searchHistoryListEl.addEventListener("click" , function(event) {
    //console.log("LIST CLICKED");
    var cityName = event.target.textContent;
    //console.log(">>> history city name >>>" , cityName);

    // reset containers to be blank to remove previous search display
        currentWeatherContainerEl.innerHTML = "";
        currentWeatherDetailsContainerEl.innerHTML = "";
        forecastContainerEl.innerHTML = "";

        getWeatherCurrent(cityName);
        getWeatherForecast(cityName);
});

// not including search button now; not working nor required
// clearSearchHistoryEl.addEventListener("click", function() {
//     localStorage.removeItem("cities");

//     // remove the buttons from list
//     searchHistoryListEl.removeChild;

//     loadSearch();
// });