function selectTheCity(response) {
    console.log(response);

} 



function clickSearchButton(event) {
    event.preventDefault();

let city = document.querySelector("#present-city").value;
let apiKey = "4770548bed49c5d96b7201c497695887";
let unit = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
console.log(apiUrl);

axios.get(apiUrl).then(selectTheCity)}

let form = document.querySelector("form");
form.addEventListener("click"; selectTheCity); 