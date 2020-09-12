import React from 'react'

const Notification = ({ notification }) => {
  if (!notification.message)
    return []

  return (
    <div className={`notification notification-${notification.type}`}>
      {notification.message}
    </div>
  )
}

export default Notification