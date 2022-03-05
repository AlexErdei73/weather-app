const button = document.querySelector("button");
const input = document.querySelector("input");
button.addEventListener("click", onClick);

function getWeather(city) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=db5f1eb9b2cd1a0d24607c0b04e5887b`;
  return fetch(weatherUrl, { mode: "cors" }).then((response) =>
    response.json()
  );
}

function processResponse(response) {
  const weather = {};
  weather.main = response.weather[0].main;
  weather.icon = response.weather[0].icon;
  weather.temp = response.main.temp;
  weather.humidity = response.main.humidity;
  weather.windSpeed = response.wind.speed;
  weather.country = response.sys.country;
  weather.city = response.name;
  return weather;
}

function onClick() {
  const city = input.value;
  if (!city) return;
  makeDisplayNotReady();
  setTimeout(() => {
    getWeather(city)
      .then((response) => showData(processResponse(response)))
      .catch((error) => console.log(error));
  }, 1000);
}

function showData(weather) {
  const textContents = {
    main: `${weather.main}`,
    temp: `${(weather.temp - 273.16).toFixed(2)}\u2103`,
    humidity: `humidity: ${weather.humidity}%`,
    windSpeed: `wind: ${weather.windSpeed}m/s`,
    country: `${weather.country}`,
    city: `${weather.city}`,
  };
  const elements = document.querySelectorAll(".disp");
  elements.forEach((element) => {
    const id = element.id;
    element.textContent = textContents[id];
  });
  showCountryFlag(weather.country);
  showWeatherIcon(weather.icon);
  makeDisplayReady();
}

function showCountryFlag(country) {
  const img = document.querySelector("#flag");
  img.src = `https://www.countryflags.io/${country}/flat/64.png`;
}

function showWeatherIcon(code) {
  const weatherIcons = {
    c01d: "clear-day.svg",
    c01n: "clear-night.svg",
    c02d: "partly-cloudy-day.svg",
    c02n: "partly-cloudy-night.svg",
    c03d: "cloudy.svg",
    c03n: "cloudy.svg",
    c04d: "cloudy.svg",
    c04n: "cloudy.svg",
    c09d: "rain.svg",
    c09n: "rain.svg",
    c10d: "partly-cloudy-day-rain.svg",
    c10n: "partly-cloudy-night-rain.svg",
    c11d: "thunderstorms-day.svg",
    c11n: "thunderstorms-night.svg",
    c13d: "snow.svg",
    c13n: "snow.svg",
    c50d: "mist.svg",
    c50n: "mist.svg",
  };
  code = "c" + code;
  const url = `./weather-icons/${weatherIcons[code]}`;
  const img = document.querySelector("#icon");
  img.src = url;
}

function makeDisplayReady() {
  const display = document.querySelector("#display");
  display.classList.remove("not-ready");
  display.classList.add("ready");
}

function makeDisplayNotReady() {
  const display = document.querySelector("#display");
  display.classList.remove("ready");
  display.classList.add("not-ready");
}

//render a city at the beginning to keep the page full
input.value = "Budapest";
onClick();
