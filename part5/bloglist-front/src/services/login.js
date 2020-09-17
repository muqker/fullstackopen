import axios from 'axios'

const requestAuthorization = async (username, password) => {
  try {
    const result = await axios.post('http://playground:3003/api/login', {
      username: username,
      password: password
    })
    return {
      token: result.data.token,
      username: username
    }
  } catch (error) {
    console.log(error)
    if (error.response && error.response.status === 401)
      return null
    else
      throw (error)
  }
}

const persistAuthorization = (authorization) => {
  if (authorization)
    window.localStorage.setItem('loginAuthorization', JSON.stringify(authorization))
  else
    window.localStorage.removeItem('loginAuthorization')
}

const loadAuthorization = () => {
  const serialized = window.localStorage.getItem('loginAuthorization')
  console.log(serialized)
  if (serialized) {
    return JSON.parse(serialized)
  } else {
    return null
  }
}

export default {
  requestAuthorization,
  persistAuthorization,
  loadAuthorization
}