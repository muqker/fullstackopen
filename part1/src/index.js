import React from 'react'
import ReactDOM from 'react-dom'


const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name} of {props.age} months</p>
    </div>
  )
}

const App = () => {
  const now = new Date()
  const a = 10
  const b = 20

  return (
    <div>
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
        <Hello name="Alfie" age={b-a} />
      </p>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
