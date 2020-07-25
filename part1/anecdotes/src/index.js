import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const NextButton = ({size, votes, setSelected}) => 
  <button onClick={() => setSelected(Math.floor(Math.random() * size))}>next andecdote</button>

const VoteButton = ({selected, allVotes, setAllVotes}) => {
  const voteUp = () => {
    const copy = [...allVotes]
    copy[selected] += 1
    setAllVotes(copy)
  }

  return (
    <button onClick={voteUp}>vote</button>
  )
}

const Anecdote = ({anecdote, votes}) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  )
}

const AnecdoteOfTheDay = ({anecdote, votes}) => {
  return (
    <>
      <h2>Anectode of the day</h2>
      <Anecdote anecdote={anecdote} votes={votes} />
    </>
  )
}

const AnecdoteMostVoted = ({anecdote, votes}) => {
  if (votes === 0)
    return <></>

  return (
    <>
      <h2>Anecdote with most votes</h2>
      <Anecdote anecdote={anecdote} votes={votes} />
    </>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [allVotes, setAllVotes] = useState(new Array(anecdotes.length).fill(0))
  const mostVotes = allVotes.reduce((a, b) => Math.max(a, b))
  const mostVoted = allVotes.indexOf(mostVotes)
  console.log('mostVotes', mostVotes)
  console.log('allVotes', allVotes)

  return (
    <div>
      <AnecdoteOfTheDay anecdote={anecdotes[selected]} votes={allVotes[selected]} />
      <VoteButton selected={selected} allVotes={allVotes} setAllVotes={setAllVotes} />
      <NextButton size={anecdotes.length} setSelected={setSelected} />
      <AnecdoteMostVoted anecdote={anecdotes[mostVoted]} votes={allVotes[mostVoted]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
