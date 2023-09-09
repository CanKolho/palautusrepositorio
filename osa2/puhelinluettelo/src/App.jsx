import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const alreadyAdded = (obj) => newName === obj.name

    if (persons.some(alreadyAdded)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObj = {
        name: newName,
        number: newNumber,
      }
      
      setPersons(persons.concat(personObj))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handleChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleClick={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filterValue={newFilter}/>
    </>
  )
}

export default App