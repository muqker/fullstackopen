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

export const setNotification = (notification, seconds) => {
  return dispatch => {
    dispatch({
      type: 'NOTIFY',
      data: { notification }
    })
    setTimeout(() => dispatch({
      type: 'DELETENOTIFICATION',
    }), seconds * 1000)
  }
}

export default reducer