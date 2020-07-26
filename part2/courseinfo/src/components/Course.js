import React from 'react'

const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
  const Header = ({name}) => <h2>{name}</h2>
  
  const Content = ({parts}) => parts.map(value => <Part key={value.id} part={value} />)
  
  const Part = (props) => <p>{props.part.name} {props.part.exercises}</p>
  
  const Total = ({parts}) => (
    <p><b>
      total
      of {
        parts.reduce((total, value) => total + value.exercises, 0)
      } exercises
      {/*parts.map(part => part.exercises).reduce((total, value) => total + value)*/}
    </b></p>
  )
  
  export default Course