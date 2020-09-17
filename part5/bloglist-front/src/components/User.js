import React from 'react'
import PropTypes from 'prop-types'

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

User.propTypes = {
  authorization: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default User
