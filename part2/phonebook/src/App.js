import React, { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import contactService from './services/contacts.js';



const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    contactService.getAll().then(newPersons => setPersons(newPersons))
  }, [])

  const handleDelete = id => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      contactService.remove(id).then(() => 
        setPersons(persons.filter(person => person.id !== id))
      )
    }
  }

  const handleUpdatePerson = newPerson => {
      contactService.update(newPerson)
      .then(updatedPerson => setPersons(
        persons.map(person => person.id === updatedPerson.id ? updatedPerson : person)
      ))
      .catch(() => alert('Update failed'))
      .finally(() => {
        setNewNumber('')
      })
  }

  const handleAddPerson = newPerson => {
    contactService.add(newPerson)
    .then(addedPerson => setPersons(
      persons.concat(addedPerson)
    ))
    .catch(() => alert('Add failed'))
    .finally(() => {
      setNewNumber('')
    })    
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} setFilter={setFilter} />
      <h1>add a new</h1>
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