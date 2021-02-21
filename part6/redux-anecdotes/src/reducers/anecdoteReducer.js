import anecdotesService from '../services/anecdotes.js'

const initialState = []

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      return state.map(
        anecdote =>
          anecdote.id === action.data.id
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote
      )
    case 'NEW':
      return [...state, action.data.anecdote]
    case 'INITANECDOTES':
      return action.data.anecdotes
    default: return state
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    await anecdotesService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: { id: anecdote.id }
    })
  }
}

export const newNote = (content) => {
  return async dispatch => {
    const anecdote = await anecdotesService.createNew(content)
    dispatch({
      type: 'NEW',
      data: { anecdote }
    })
  }
}

export const initAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INITANECDOTES',
      data: { anecdotes }
    })
  }
}

export default reducer