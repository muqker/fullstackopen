import React from 'react'
import { vote } from '../reducers/anecdoteReducer.js'
import { setNotification, deleteNotification } from '../reducers/notificationReducer.js'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const anecdotes = useSelector(
    ({ anectodes, filter }) =>
      [...anectodes]
        .sort((a, b) => - (a.votes - b.votes))
        .filter(anectode => anectode.content.toLowerCase().includes(filter.toLowerCase()))
  )
  const dispatch = useDispatch()


  const handleVote = (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(setNotification(`You voted: '${anecdote.content}'`, 5))
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
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
          <br />
        </div>
      )}
    </>
  )
}

export default AnecdoteList