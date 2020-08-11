import React from 'react'

const Persons = ({ persons, filter, handleDelete }) => {
  return (
    <div>
      {persons.filter(
        // not using regex as the user may unintentionally inject regex in the filter
        person => person.name.toLowerCase().includes(filter.toLowerCase())
      ).map(
        person =>
          <p key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </p>
      )}
    </div>
  )
}

export default Persons
