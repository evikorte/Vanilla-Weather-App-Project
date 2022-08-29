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

  let selectWeatherState = response.data.weather[0].main;
  console.log(selectWeatherState);
  let currentState = document.querySelector("#description");
  currentState.innerHTML = `${response.data.weather[0].main}`;
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
function dateUpdate (date) {
    currentDate.innerHTML = `${currentDay}, ${currentHour}:${currentMinute}`;
}

let now = new Date();
let days = ["Sunday", "Monday"
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"];

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

let currentDate = document.querySelector("#current-date");
currentDate.addEventListener("submit", updateDate);