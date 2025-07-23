import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {

  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  
  const [country, setCountry] = useState(null)

  useEffect(() => {

    if (!name) {
      setCountry(null)
      return 
    }
      
  const fetchCountries = async () => {
    try {
  
      const response = await axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${encodeURIComponent(name)}?fullText=true`)

      if (response.data && response.data.name) {
        const countryData = response.data
        console.log('Contry found: ', countryData)

        if (countryData) {
          
          setCountry({
            found: true,
            data: {
              name: countryData.name.common,
              capital: countryData.capital,
              population: countryData.population,
              flag: countryData.flags.png
            }
          })
        } else {
          setCountry({ found: false })
        }
      } else {
        setCountry({ found: false })
      }
    }
    catch(error) {
      console.log('Error finding country: ', error)
      setCountry({ found: false })
    }
  }
    fetchCountries()
    
  }, [name])

  return country
}

const Country = ({ country }) => {

  console.log('Country: ', country)
  
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        Country Not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>Capital: {country.data.capital[0]} </div>
      <div>Population: {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (event) => {

    event.preventDefault()

    setName(nameInput.value.trim())
  }

  return (
    <div>
      <form onSubmit={fetch}>
        Country:
        <input {...nameInput} />
        <button>Find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App