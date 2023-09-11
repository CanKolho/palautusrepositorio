import { useEffect, useState } from 'react'
import axios from 'axios'

const WeatherData = ({ country }) => {
  const [weather, setWeather] = useState(null)

  const api_key = import.meta.env.VITE_API_KEY

  useEffect(() => {
    console.log('fetching weather data...');
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`)
      .then((response) => {
        setWeather(response.data)
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error)
      })
  }, [])

  return (
    <>
      <h2>Weather in {country.capital}</h2>
      {weather ? (
        <>
          <p>temperature {weather.main.temp} °C</p>
          <img
            alt={weather.weather[0].description}
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <p>wind {weather.wind.speed} m/s</p>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </>
  )
}

export default WeatherData;
