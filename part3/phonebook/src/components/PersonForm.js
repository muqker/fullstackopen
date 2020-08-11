import React from 'react'

const PersonForm = ({
  newName, newNumber,
  setNewName, setNewNumber,
  persons, handleUpdatePerson, handleAddPerson
}) => {
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => newName === person.name)
    console.log(existingPerson)
    if (existingPerson !== undefined) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`))
        handleUpdatePerson({ id: existingPerson.id, name: newName, number: newNumber })
    } else {
      handleAddPerson({ name: newName, number: newNumber })
    }
  }

  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
