import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        console.log('response', initialPersons)
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const deletePerson = id => {
    const person = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(id)
        .then(deleteInfo => {
          console.log('delete info', deleteInfo)
          console.log('remained persons', persons.filter(p => p.id !== id))
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error =>
          console.log(error),
          alert(`the person '${person.name}' was already deleted from server`)
        )
    }
  }

  const updatePerson = (person, newNumber) => {
    const changedPerson = { ...person, number: newNumber }

    personService
      .update(person.id, changedPerson)
      .then(updatedPerson => {
        console.log('Updated to', updatedPerson)
        setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson))

        setNewName('')
        setNewNumber('')
      })
      .catch(error => 
        console.log(error),
        alert(`Error occured when updating ${person.name}'s number`)
      )
  }

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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        console.log('person', person)
        updatePerson(person, newNumber)
      }
    } else {
      const personObj = {
        name: newName,
        number: newNumber,
      }
      
      personService
        .create(personObj)
        .then(returnedPerson => {
          console.log('created', returnedPerson)
          setPersons(persons.concat(returnedPerson))

          setNewName('')
          setNewNumber('')
        })
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
      <Persons persons={persons} filterValue={newFilter} handleClick={deletePerson}/>
    </>
  )
}

export default App