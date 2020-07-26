import React, { useState } from 'react'

const Person = ({person}) => 
  <p key={person.name}>{person.name} {person.number} </p>

const Persons = ({persons, filter}) => {
  return (
    <div>
      {persons.filter(
        // not using regex as the user may unintentionally inject regex in the filter
        person => person.name.toLowerCase().includes(filter.toLowerCase())
      ).map(
        person => <Person person={person} /> 
      )}
    </div>
  )
}

export default Persons
