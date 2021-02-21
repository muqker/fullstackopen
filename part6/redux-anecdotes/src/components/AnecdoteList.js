import React from 'react'
import { vote } from '../reducers/anecdoteReducer.js'
import { setNotification } from '../reducers/notificationReducer.js'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes

  const handleVote = (anecdote) => {
    props.vote(anecdote)
    props.setNotification(`You voted: '${anecdote.content}'`, 5)
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

const mapStateToProps = (state) => {
  return {
    anecdotes:
      [...state.anectodes]
        .sort((a, b) => - (a.votes - b.votes))
        .filter(anectode => anectode.content.toLowerCase().includes(state.filter.toLowerCase()))
  }
}

const mapDispatchToProps = {
  vote,
  setNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList