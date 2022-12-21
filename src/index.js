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
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", response.data.condition.icon_url);
  weatherDescription.setAttribute("alt", response.data.condition.description);

  celsiusTemperature = response.data.temperature.current;
}

function changeCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#town-input");
  let cityInput = document.querySelector("#city-input");
  cityName.innerHTML = cityInput.value;

  let apiKey = "343bb4d2fc1a4234edcd750t80ofe9d0";
  let units = "metric";
  let city = cityInput.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=343bb4d2fc1a4234edcd750t80ofe9d0&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showWeather);
}

function showLocalWeather() {
  function getCurrentPosition(geolocation) {
    let latitude = geolocation.coords.latitude;
    let longitude = geolocation.coords.longitude;
    let apiKey = "343bb4d2fc1a4234edcd750t80ofe9d0";
    let units = "metric";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=343bb4d2fc1a4234edcd750t80ofe9d0&units=metric`;

    axios.get(apiUrl).then(showWeather);
  }

  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCeliusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature = null;

let fahrenheitTemp = document.querySelector("#fahrenheit-link");
fahrenheitTemp.addEventListener("click", displayFahrenheitTemp);

let celsiusTemp = document.querySelector("#celsius-link");
celsiusTemp.addEventListener("click", displayCeliusTemp);

let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

let currentCityButton = document.querySelector("#current-location");
currentCityButton.addEventListener("click", showLocalWeather);

showLocalWeather();
