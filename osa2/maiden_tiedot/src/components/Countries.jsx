import Country from "./Country"

const Countries = ({ countries, setFiltered }) => {
  const length = countries.length
  if (length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (1 < length && length <= 10) {
    return (
    <ul>
      {countries
        .map( c => 
          <li key={c.name.common}>
              {c.name.common}{' '}
              <button onClick={() => setFiltered([c])}>Show</button>
          </li>
        )
      }
    </ul>
    )
  } else if (length === 1) { 
    return (
      <Country country={countries[0]}/>
    )
  } else {
    return (
      <p>No countries found!</p>
    )
  }
}

export default Countries