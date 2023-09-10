import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  {/*if type=true then msg is indicating succesMsg
    *if type=false then msg is indicating errorMSg */}
  const [msgType, setMsgType] = useState(true)
  
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

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const showSuccessMsg = (successMsg) => {
    setMessage(successMsg)
    setMsgType(true)
    setTimeout(() => {setMessage(null)}, 5000)
  }

  const showErrorMsg = (ErrorMsg, id) => {
    setPersons(persons.filter(p => p.id !== id))
    setMessage(ErrorMsg)
    setMsgType(false)
    setTimeout(() => {setMessage(null)}, 5000)
  }

  const deletePerson = id => {
    const person = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(id)
        .then(deleteInfo => {
          console.log('deletePerson, THEN')
          console.log('delete info', deleteInfo)
          console.log('remained persons', persons.filter(p => p.id !== id))
          setPersons(persons.filter(p => p.id !== id))
          showSuccessMsg(`${person.name} was deleted successfully.`)
        })
        .catch(error => {
          console.log(error)
          console.log('deletePerson, CATCH')
          showErrorMsg(`Information of '${person.name}' has already been removed from server`, person.id)
        })
    }
  }

  const updatePerson = (person, newNumber) => {
    const changedPerson = { ...person, number: newNumber }

    personService
      .update(person.id, changedPerson)
      .then(updatedPerson => {
        console.log('updatePerson, THEN')
        console.log('Updated to', updatedPerson)
        setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson))
        showSuccessMsg(`${changedPerson.name}'s information was updated successfully.`)
      })
      .catch(error => {
        console.log('updatePerson, CATCH')
        console.log(error)
        showErrorMsg(`Information of '${changedPerson.name}' has already been removed from server`, changedPerson.id)
      })

    setNewName('')
    setNewNumber('')
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

          showSuccessMsg(`Added ${returnedPerson.name}`)
        })
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={message} type={msgType}/>
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