// Feature 1
let dateElement = document.querySelector("#date-time");
let currentTime = new Date();
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dayIndex = currentTime.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let monthIndex = currentTime.getMonth();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let yearIndex = currentTime.getFullYear();
let date = currentTime.getDate();

dateElement.innerHTML = `${hours}:${minutes}, ${days[dayIndex]} ${date}`;

// Bonus Feature
function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (fahrenheitElement.innerHTML * 9) / 5 + 32;
  fahrenheitElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelius(event) {
  event.preventDefault();
  let celsiusElement = document.querySelector("#temperature");
  let celsiusTemperature = celsiusElement.innerHTML;
  celsiusElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitTemp = document.querySelector("#fahrenheit-link");
fahrenheitTemp.addEventListener("click", convertToFahrenheit);

let celsiusTemp = document.querySelector("#celsius-link");
celsiusTemp.addEventListener("click", convertToCelius);

// Search Engine Home Project

function showWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  document.querySelector("#town-input").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  let weatherDescription = document.querySelector("#description-weather");
  weatherDescription.innerHTML = response.data.condition.description;
  document.querySelector(
    "#humidity"
  ).innerHTML = `humidity: ${response.data.temperature.humidity}%`;
  document.querySelector("#wind").innerHTML = `wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;

  celsiusTemperature = response.data.temperature.current;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
}

function changeCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#town-input");
  let cityInput = document.querySelector("#city-input");
  cityName.innerHTML = cityInput.value;

  let apiKey = "343bb4d2fc1a4234edcd750t80ofe9d0";
  let units = "metric";
  let city = cityInput.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function showLocalWeather() {
  function getCurrentPosition(geolocation) {
    let latitude = geolocation.coords.latitude;
    let longitude = geolocation.coords.longitude;
    let apiKey = "bb0df6985c2eab6a171d64a6bacbb4e1";
    let units = "metric";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

    axios.get(apiUrl).then(showWeather);
  }

  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

showLocalWeather();

let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

let currentCityButton = document.querySelector("#current-location");
currentCityButton.addEventListener("click", showLocalWeather);
