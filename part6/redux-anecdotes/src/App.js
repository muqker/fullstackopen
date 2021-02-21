import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm.js'
import AnecdoteList from './components/AnecdoteList.js'
import Notification from './components/Notification.js'
import Filter from './components/Filter.js'
import anecdotesService from './services/anecdotes.js'
import { useDispatch } from 'react-redux'
import { initAnecdotes } from './reducers/anecdoteReducer.js'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdotesService.getAll().then(anecdotes => dispatch(initAnecdotes(anecdotes)))
  })

  return (
    <div>
      <Notification />
      <AnecdoteForm />
      <Filter />
      <AnecdoteList />
    </div>
  )
}

export default App