import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({text, good, neutral, bad}) => {
  if (text === 'good') {
    return <tr><td>{text}</td><td>{good}</td></tr>
  } else if (text === 'neutral') {
    return <tr><td>{text}</td><td>{neutral}</td></tr>
  } else if (text === 'bad') {
    return <tr><td>{text}</td><td>{bad}</td></tr>
  } else if (text === 'average' && (good + bad) !== 0) {
    return <tr><td>{text}</td><td>{(good - bad) / (good + bad)}</td></tr>
  } else if (text === 'positive' && (good + bad) !== 0) {
    return <tr><td>{text}</td><td>{100 * good / (good + bad)} %</td></tr>
  } else {
    return <></>
  }
}

const Statistics = ({good, neutral, bad}) => {
  if (good !== 0 || neutral !== 0 || bad !== 0)
  {
      return (
        <table>
          <tbody>
            <Statistic text="good" good={good} neutral={neutral} bad={bad} />
            <Statistic text="neutral" good={good} neutral={neutral} bad={bad} />
            <Statistic text="bad" good={good} neutral={neutral} bad={bad} />
            <Statistic text="average" good={good} neutral={neutral} bad={bad} />
            <Statistic text="positive" good={good} neutral={neutral} bad={bad} />
          </tbody>
        </table>
      )
  }
  else {
    return <p>No feedback given</p>
  }

}

const GiveFeedback = ({giveGoodFeedback, giveNeutralFeedback, giveBadFeedback}) => {
  return (
    <div>
      <Button text="good" onClick={giveGoodFeedback} />
      <Button text="neutral" onClick={giveNeutralFeedback} />
      <Button text="bad" onClick={giveBadFeedback} />
    </div>
  )
}

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h2>give feedback</h2>
      <GiveFeedback 
        giveGoodFeedback={() => setGood(good + 1)}
        giveNeutralFeedback={() => setNeutral(neutral + 1)} 
        giveBadFeedback={() => setBad(bad + 1)} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)