// city + temp +description update
// extra info need to be added!

function selectedCityResults(response) {
  console.log(response);
  console.log(response.data.name);
  let currentCityNote = document.querySelector("#present-city");
  currentCityNote.innerHTML = `Currently in ${response.data.name}:`;

  let selectCityTemp = Math.round(response.data.main.temp);
  console.log(selectCityTemp);
  let currentTemp = document.querySelector("#present-degree");
  currentTemp.innerHTML = `${selectCityTemp}`;
  //C - F issue need to be solved!

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

let form = document.querySelector("form");
form.addEventListener("submit", clickSearchButton);

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

console.log(currentHour);
console.log(currentMinute);

let presentDate = document.querySelector("#present-time");
form.addEventListener("submit", updateDate);

//Current location function
function searchCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "metric";
  let apiKey = "a38462addd821b469c162937a66aa309";

  apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(selectedCityResults);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let currentButton = document.querySelector("#current-position-button");
currentButton.addEventListener("click", getCurrentLocation);
