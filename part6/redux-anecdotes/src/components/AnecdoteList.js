import React from 'react'
import { vote } from '../reducers/anecdoteReducer.js'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => [...state].sort((a, b) => - (a.votes - b.votes)))
  const dispatch = useDispatch()

  const handleVote = (id) => {
    dispatch(vote(id))
    console.log('vote', id)
  }

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList