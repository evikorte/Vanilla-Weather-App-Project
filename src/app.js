let city = document.querySelector("#present-city");
let apiKey = "a38462addd821b469c162937a66aa309";
let unit = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
console.log(apiUrl);
