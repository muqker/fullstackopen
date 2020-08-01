import React, { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import contactService from './services/contacts';
import './index.css'



const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification ] = useState(null)

  useEffect(() => {
    contactService.getAll().then(newPersons => setPersons(newPersons))
  }, [])

  const handleDelete = id => {
    const deletedPerson = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${deletedPerson.name}?`)) {
      contactService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
        fireNotification({
          type: 'success', 
          message: `Deleted ${deletedPerson.name}`
        })        
      })
    }
  }

  const handleUpdatePerson = newPerson => {
      contactService.update(newPerson)
      .then(updatedPerson => {
        setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
        fireNotification({
          type: 'success', 
          message: `Updated ${newPerson.name}`
        })
      })
      .catch(() => {
        fireNotification({
          type: 'error', 
          message: `Information of ${newPerson.name} has already been removed from server`
        })
        setPersons(persons.filter(person => person.id !== newPerson.id))
      })
      .finally(() => {
        setNewNumber('')
      })
  }

  const handleAddPerson = newPerson => {
    contactService.add(newPerson)
    .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        fireNotification({
          type: 'success', 
          message: `Added ${addedPerson.name}`
        })
    })
    .catch(() => alert('Add failed'))
    .finally(() => {
      setNewNumber('')
    })    
  }

  const fireNotification = (notification) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm 
        newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber}
        persons={persons} 
        handleUpdatePerson={handleUpdatePerson} handleAddPerson={handleAddPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

export default App