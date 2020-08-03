import React, { useState } from 'react';


const api = {
  key: "3fa0ed71ccb9dcbcb069be8fa548440a",
  base: "https://api.openweathermap.org/data/2.5/"
}

const dateBuilder = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()],
      date = d.getDate(),
      month = months[d.getMonth()],
      year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    if(e.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery('');  
          setWeather(result);
        });
    }
  };

  return(
    <div className={
      (typeof weather.main != "undefined")
          ? ((weather.main.temp > 16)
            ? 'app warm'
              : 'app')
                : 'app'}> 
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
              </div>
                <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  )
}

export default App;
