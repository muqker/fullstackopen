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

export const setNotification = (notification) => {
  return {
    type: 'NOTIFY',
    data: { notification }
  }
}

export const deleteNotification = (notification) => {
  return {
    type: 'DELETENOTIFICATION',
  }
}

export default reducer