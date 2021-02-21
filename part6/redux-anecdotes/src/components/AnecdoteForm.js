import React from 'react'
import { newNote } from '../reducers/anecdoteReducer.js'
import { setNotification } from '../reducers/notificationReducer.js'
import { connect } from 'react-redux'


const AnecdoteForm = (props) => {
  const handleSubmit = async (event) => {
    event.preventDefault()

    const content = event.target.content.value
    event.target.content.value = ''

    props.newNote(content)
    props.setNotification(`Note created: '${content}'`, 5)
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

const mapDispatchToProps = {
  newNote,
  setNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm