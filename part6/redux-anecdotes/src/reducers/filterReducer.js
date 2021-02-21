const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SETFILTER':
      return action.data.filter
    default: return initialState
  }
}

export const setFilter = (filter) => {
  return {
    type: 'SETFILTER',
    data: { filter }
  }
}

export default reducer