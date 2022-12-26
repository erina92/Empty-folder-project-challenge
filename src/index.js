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

dateElement.innerHTML = `${hours}:${minutes} ${days[dayIndex]} ${date} ${yearIndex}`;

function showForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecastHTML = `
      <div class="col-2">
        <div class="weather-forecast-day">Mon</div>
          <img
            src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/mist-day.png"
            alt=""
            width="80"
          />
          <div class="weather-forecast-temperatures">
            <span class="max">20°</span>
            <span class="min">10°</span>
          </div>
        </div>
      </div>
  `;
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "343bb4d2fc1a4234edcd750t80ofe9d0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}

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
  ).innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", response.data.condition.icon_url);
  weatherDescription.setAttribute("alt", response.data.condition.description);

  celsiusTemperature = response.data.temperature.current;

  getForecast(response.data.coordinates);
}

function changeCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#town-input");
  let cityInput = document.querySelector("#city-input");
  cityName.innerHTML = cityInput.value;
  // 🔌Api Integrationn
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
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;

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
