let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

//current time and date
let now = new Date();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let dateLine = document.querySelector("#current-time");
dateLine.innerHTML = `${day} ${hour}:${minutes}`;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
               
              <div class="col">
                <h4>${day}</h4>
                <i class="fa-solid fa-sun emoji"></i>
                <h3>
                  <span class="day-weather">25°</span>/<span
                    class="night-weather"
                    >13°</span>
                </h3>
              </div>
              `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//search engine
function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temperature");
  let cityUpdated = document.querySelector("#city");
  currentTemp.innerHTML = `${temperature}°C`;
  cityUpdated.innerHTML = response.data.name;
  //document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#precipitation").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels_like").innerHTML = Math.round(
    response.data.main.feels_like
  );

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
}
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let newCity = document.querySelector("#city");
  newCity.innerHTML = searchInput.value;
  let units = "metric";
  let apiKey = "87c09bdb993a722cfadfd41eadb2c1ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "87c09bdb993a722cfadfd41eadb2c1ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

//button Current
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector(".current");
button.addEventListener("click", getCurrentPosition);

//show city by default
function searchCity(city) {
  let apiKey = "87c09bdb993a722cfadfd41eadb2c1ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}
searchCity("Westervoort");
displayForecast();
