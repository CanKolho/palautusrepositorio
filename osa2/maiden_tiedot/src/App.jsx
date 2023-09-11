import { useState, useEffect } from 'react'
import axios from 'axios'
import Finder from './components/Finder'
import Countries from './components/Countries'

const App = () => {
  const [value, setValue] = useState('')
  const [allCountries, setAll] = useState([])
  const [filteredCountries, setFiltered] = useState([])

  useEffect(() => {
    console.log('effect')
    console.log('fetching all countries...')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log('all', response.data)
        setAll(response.data)
        console.log('fetching all countries DONE')
      })
  }, [])

  const handleSearch = (event) => {
    console.log('handling search')
    const newValue = event.target.value
    console.log(newValue)
    setValue(newValue)
    console.log(filteringCountries(newValue))
    setFiltered(filteringCountries(newValue))
  }

  const filteringCountries = (value) => 
    allCountries
      .filter(c => c.name.common.toLocaleLowerCase().includes(value.toLocaleLowerCase()))

  return (
    <>
      <Finder value={value} handleSearch={handleSearch}/>
      <Countries countries={filteredCountries} setFiltered={setFiltered} />
    </>
  )
}

export default App