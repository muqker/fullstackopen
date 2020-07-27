import React from 'react'

const Persons = ({persons, filter}) => {
  return (
    <div>
      {persons.filter(
        // not using regex as the user may unintentionally inject regex in the filter
        person => person.name.toLowerCase().includes(filter.toLowerCase())
      ).map(
        person => <p key={person.name}>{person.name} {person.number} </p> 
      )}
    </div>
  )
}

export default Persons
