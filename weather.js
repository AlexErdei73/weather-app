function getWeather(city) {
  const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=db5f1eb9b2cd1a0d24607c0b04e5887b`;
  return fetch(weatherUrl, { mode: "cors" }).then((response) => {
    return response.json();
  });
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

getWeather("Newport Pagnell").then((response) => {
  console.log(processResponse(response));
});
