const initialState = 'Welcome!'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.data.notification
    case 'DELETENOTIFICATION':
      return ''
    default: return state
  }
}

let lastTimeoutId = null

export const setNotification = (notification, seconds) => {
  return dispatch => {
    dispatch({
      type: 'NOTIFY',
      data: { notification }
    })
    if (lastTimeoutId) {
      clearTimeout(lastTimeoutId)
    }

    const timeoutId = setTimeout(() => dispatch({
      type: 'DELETENOTIFICATION',
    }), seconds * 1000)
    lastTimeoutId = timeoutId
  }
}

export default reducer