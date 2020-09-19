import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLoginSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLoginSubmit(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login to the application</h2>
      <form onSubmit={handleSubmit}>
        Username: <input id="username" onChange={ (event) => setUsername(event.target.value) } /> <br />
        Password: <input id="password" type="password" onChange={(event) => setPassword(event.target.value)} /> <br />
        <input id="login" type="submit" value="login" />
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLoginSubmit: PropTypes.func.isRequired
}

export default LoginForm