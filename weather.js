function getWeather(city) {
  const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=db5f1eb9b2cd1a0d24607c0b04e5887b`;
  return fetch(weatherUrl, { mode: "cors" }).then((response) => {
    return response.json();
  });
}

getWeather("Newport Pagnell").then((response) => {
  console.log(response);
});
