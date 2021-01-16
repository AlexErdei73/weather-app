const button = document.querySelector("button");
const input = document.querySelector("input");
button.addEventListener("click", onClick);

function getWeather(city) {
  const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=db5f1eb9b2cd1a0d24607c0b04e5887b`;
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
  getWeather(city)
    .then((response) => showData(processResponse(response)))
    .catch((error) => console.log(error));
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
}

function showCountryFlag(country) {
  const img = document.querySelector("#flag");
  img.src = `https://www.countryflags.io/${country}/flat/64.png`;
}
