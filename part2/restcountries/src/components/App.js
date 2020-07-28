import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './Filter';
import ListCountries from './ListCountries';
import CountryDetails from './CountryDetails';
import Weather from './Weather';

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [countryDetails, setCountryDetails] = useState(null)
  const [weather, setWeather] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY
  //console.log(process.env.api_key)

  useEffect(() => { 
    if (filter.length > 0) {
      axios.get(`https://restcountries.eu/rest/v2/name/${filter}`)
      .then(response => setCountries(response.data))
      .catch(() => setCountries([]))
    } else {
      setCountries([])
    }
  },[filter])

  useEffect(() => { 
    setCountryDetails(countries.length === 1 ? countries[0] : null)
    setWeather(null)
  }, [countries])

  useEffect(() => {
    if (countryDetails === null)
      return

    axios
      .get('http://api.weatherstack.com/current', {
        params: {
          access_key: api_key,
          query: countryDetails.name
        }
      })
      .then(response => setWeather(response.data))
      .catch(() => setWeather(null))
  }, [countryDetails, api_key])

  return (
    <div>
      <h1> Countries </h1>
      <Filter filter={filter} setFilter={setFilter} />
      <ListCountries countries={countries} setCountryDetails={setCountryDetails}/>
      <CountryDetails countryDetails={countryDetails} />
      <Weather weather={weather} />
    </div>
  )
}

export default App;
