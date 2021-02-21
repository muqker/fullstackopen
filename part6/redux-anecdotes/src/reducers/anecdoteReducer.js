const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = []

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      return state.map(
        note =>
          note.id === action.data.id
            ? { ...note, votes: note.votes + 1 }
            : note
      )
    case 'NEW':
      return [...state, action.data.anecdote]
    case 'INITANECDOTES':
      return action.data.anecdotes
    default: return state
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const newNote = (anecdote) => {
  return {
    type: 'NEW',
    data: { anecdote }
  }
}

export const initAnecdotes = (anecdotes) => {
  return {
    type: 'INITANECDOTES',
    data: { anecdotes }
  }
}

export default reducer