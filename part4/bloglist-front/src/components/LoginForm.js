import React from 'react'

const LoginForm = ({setUsername, setPassword, handleLoginSubmit}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleLoginSubmit()
  }

  return (
    <div>
      <h2>Login to the application</h2>
      <form onSubmit={handleSubmit}>
        Username: <input onChange={(event) => setUsername(event.target.value)} /> <br />
        Password: <input type="password" onChange={(event) => setPassword(event.target.value)} /> <br />
        <input type="submit" value="login" />
      </form>      
    </div>
  )
}

export default LoginForm