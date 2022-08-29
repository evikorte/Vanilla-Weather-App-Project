function displayTemp(response) {
  console.log(response);
  console.log(response.data.main.temp);
  let currentTemp = Math.round(response.data.main.temp);
  console.log(currentTemp);
}

let city = "London";
let apiKey = "4770548bed49c5d96b7201c497695887";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
console.log(apiUrl);

axios.get(apiUrl).then(displayTemp);
