import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  let [city, setCity] = useState("");
  let [result, setResult] = useState("");
  const [weather, setWeather] = useState(null);

  function updateCity(event) {
    setCity(event.target.value);
  }

  function handleSubmit() {
    event.preventDefault();
    let apiKey = "58a6775f97527351bf6c6966e209be39";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function displayWeather(response) {
    setResult(true);
    console.log(response.data);
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type a city..."
        value={city}
        onChange={updateCity}
      />
      <input type="Submit" value="Search" readOnly />
    </form>
  );

  if (result) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature:{weather.temperature}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity:{weather.humidity}%</li>
          <li>Wind: {weather.wind} m/s</li>
          <li>
            <img src={weather.icon} alt="weather icon" />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
