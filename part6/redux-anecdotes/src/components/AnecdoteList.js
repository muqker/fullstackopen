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


  const handleVote = (id) => {
    dispatch(vote(id))
    dispatch(setNotification(`You voted: '${anecdotes.find(anectode => anectode.id === id).content}'`))
    setTimeout(() => dispatch(deleteNotification()), 5000)

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