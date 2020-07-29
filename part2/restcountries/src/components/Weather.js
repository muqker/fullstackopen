import React from 'react';

const Weather = ({weather}) => {
  console.log('reder Weather')

  if (weather === null) {
    return []
  }
  
  //console.log(weather)
  return (
    <div>
      <h2>Weather in {weather.location.name}</h2>
      <b>temperature:</b> {weather.current.temperature} celsius<br />
      <img width="50" 
        alt={weather.current.weather_description} 
        src={weather.current.weather_icons[0]} 
      /><br />
      <b>wind: </b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}
    </div>
  )
}

export default Weather;
