import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (!notification.message)
    return []

  return (
    <div className={`notification notification-${notification.type}`}>
      {notification.message}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired
}

export default Notification