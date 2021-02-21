import React from 'react'
import { newNote } from '../reducers/anecdoteReducer.js'
import { setNotification, deleteNotification } from '../reducers/notificationReducer.js'
import { useDispatch } from 'react-redux'
import anecdotesService from '../services/anecdotes.js'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const content = event.target.content.value
    event.target.content.value = ''
    const newAnecdote = await anecdotesService.createNew(content)

    dispatch(newNote(newAnecdote))
    dispatch(setNotification(`Note created: '${newAnecdote.content}'`))
    setTimeout(() => dispatch(deleteNotification()), 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
