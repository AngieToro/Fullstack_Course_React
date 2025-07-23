import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleCountrySelection = async (country) =>{

    console.log('Country value is: ', country);

    setSelectedCountry(country)

    if (!country.latlng || country.latlng.length !== 2){
      console.warn('No coordinates available for this country')
      setWeather(null)
      return
    }

    try {

      const [latitude, longitude] = country.latlng
      console.log('Latitud:', latitude)
      console.log('Longitud:', longitude)

      const weatherResponse = await axios 
        .get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
 
      console.log('Weather: ', weatherResponse.data);
              
      setWeather(weatherResponse.data)

    } catch (error) {
      console.error('Error fetching weather:', error)
      setWeather(null)
    }
  }

  const hook = () => {

    if (value.trim() === ''){
      setCountries([])
      setSelectedCountry(null)
      setWeather(null)
      return
    }
    
    const fetchCountries = async () => {
      try {

        const countriesResponse = await axios
          .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        
        const filtered = countriesResponse.data.filter (
          country => country.name.common.toLowerCase().includes(value.toLowerCase())
        )
        console.log('Contry found: ', filtered)

        setCountries(filtered)
            
        if (filtered.length === 1){
          handleCountrySelection(filtered[0])  
        } else {
          setSelectedCountry(null)
          setWeather(null)
        }
    }
    catch(error) {
      console.log('Error finding countries: ', error)
      setCountries([])
      setSelectedCountry(null)
      setWeather(null)
    }
  }
    fetchCountries()
  }
      
  useEffect(hook, [value])


  return (
      <div>
        <h1>Find Countries:</h1>
        <input value={value} onChange={handleChange} />

        {countries.length === 0 && value ? (
          <p>No matches found</p>
        ) : countries.length > 10 ? (
            <p>Too many matches, specify another filder</p>
        ) : selectedCountry ? (
          <div>
            <p>
              <button onClick={() => setSelectedCountry(null)}>Show Countries List</button>
            </p>
            <h2>{selectedCountry.name.common}</h2>
            <p>Capital: {selectedCountry.capital}</p>
            <p>Area: {selectedCountry.area}</p>
            <h3>Languages</h3>
            <ul>
              {Object.values(selectedCountry.languages).map(language => (
                <li key ={language}>{language}</li>
              ))}
            </ul>
            <h3>Flag</h3>
            <img 
              src={selectedCountry.flags.png} 
              alt={`Flag of ${selectedCountry.name.common}`}
            />
            {weather?.current_weather && (
            <>
              <h3>Weather</h3>
              <p>Temperature: {weather.current_weather.temperature} °C</p>
              <p>Wind: {weather.current_weather.windspeed} km/h</p>
            </>
            )}
          </div>
        ) : (
          <ul>
            {countries.map(country => (
              <li key ={country.cca3}>
                {country.name.common} 
                {' - '}  
                <button onClick={() => handleCountrySelection(country)}>Show</button>
              </li>
            ))}
          </ul>
        )}
      </div>
  )
}

export default App