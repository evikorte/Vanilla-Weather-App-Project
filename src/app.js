// City selection function

function selectedCityResults(response) {
  console.log(response);
  console.log(response.data.name);
  let currentCityNote = document.querySelector("#present-city");
  currentCityNote.innerHTML = `Currently in ${response.data.name}:`;

  celsiusTemp = response.data.main.temp;
  let selectCityTemp = Math.round(celsiusTemp);
  console.log(selectCityTemp);
  let currentTemp = document.querySelector("#present-degree");
  currentTemp.innerHTML = `${selectCityTemp}`;

  let selectWeatherState = response.data.weather[0].main;
  console.log(selectWeatherState);
  let currentState = document.querySelector("#description");
  currentState.innerHTML = `${response.data.weather[0].main}`;

  let selectedIcon = response.data.weather[0].icon;
  console.log(selectedIcon);
  let currentIcon = document.querySelector("#present-icon");
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${selectedIcon}@2x.png`
  );
  currentIcon.setAttribute("alt", response.data.weather[0].description);

  let selectPressure = response.data.main.pressure;
  console.log(selectPressure);
  let currentPressure = document.querySelector("#pressure-value");
  currentPressure.innerHTML = `${response.data.main.pressure}`;

  let selectHumidity = response.data.main.humidity;
  console.log(selectHumidity);
  let currentHumidity = document.querySelector("#humidity-value");
  currentHumidity.innerHTML = `${response.data.main.humidity}`;

  let selectWind = response.data.wind.speed;
  console.log(selectWind);
  let currentWind = document.querySelector("#wind-value");
  currentWind.innerHTML = `${response.data.wind.speed}`;

  //Daily forecast calls
  getDailyForecast(response.data.coord);
}

function clickSearchButton(event) {
  event.preventDefault();

  let city = document.querySelector("#city").value;
  let apiKey = "a38462addd821b469c162937a66aa309";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

  console.log(apiUrl);

  axios.get(apiUrl).then(selectedCityResults);
}

// date update

function updateDate(date) {
  presentDate.innerHTML = `${currentDay}, ${currentHour}:${currentMinute}`;
}

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[now.getDay()];
console.log(currentDay);

let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinute = now.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

function formatForecastDates(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDate();
  console.log(day);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  console.log(days);

  return days[day];
}
console.log(currentHour);
console.log(currentMinute);

//Current location function
function searchCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "metric";
  let apiKey = "a38462addd821b469c162937a66aa309";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(selectedCityResults);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

// Fahrenheit conversion

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = celsiusTemp * (9 / 5) + 32;
  console.log(fahrenheitTemp);
  celsiusConverter.classList.remove("active");
  fahrenheitConverter.classList.add("active");
  let temperatureElement = document.querySelector("#present-degree");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

//Celsius conversion
function convertToCelius(event) {
  event.preventDefault();
  celsiusConverter.classList.add("active");
  fahrenheitConverter.classList.remove("active");
  let temperatureElement = document.querySelector("#present-degree");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

//gat and display daily forecast:

function getDailyForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let lon = coordinates.lon;
  let lat = coordinates.lat;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayDailyForecast);
}

function displayDailyForecast(response) {
  let forcastData = response.data.daily;

  let forcastElement = document.querySelector("#daily-forecast");
  let forecastHTML = `<div class="row">`;

  forcastData.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col tomorrow">
             <div class="forcast-day"> ${formatForecastDates(
               forecastDay.dt
             )} </div>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt="Present temperature icon"
                id="forecast-icon"
                width="45"
              />
              <div class="tomorrowTemp">
                <span class="maxTemp">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="minTemp">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forcastElement.innerHTML = forecastHTML;
}
//

let celsiusTemp = null;

let form = document.querySelector("form");
form.addEventListener("submit", clickSearchButton);

let presentDate = document.querySelector("#present-time");
form.addEventListener("submit", updateDate);

let currentButton = document.querySelector("#current-position-button");
currentButton.addEventListener("click", getCurrentLocation);
currentButton.addEventListener("click", updateDate);

let fahrenheitConverter = document.querySelector("#fahrenheit-sign");
console.log(fahrenheitConverter);
fahrenheitConverter.addEventListener("click", convertToFahrenheit);

let celsiusConverter = document.querySelector("#celsius-sign");
celsiusConverter.addEventListener("click", convertToCelius);
