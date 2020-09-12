import React from 'react'

const User = ({ authorization, handleLogout }) => {
  return (
    <>
      <p>
        <span>Logged in as {authorization.username} </span>
        <button onClick={handleLogout}>logout</button>
      </p>
    </>
  )
}

export default User
