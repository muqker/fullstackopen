import React, { useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const ToggleVisibility = React.forwardRef((props, ref) => {
  const [show, setShow] = useState('')

  const toggleShowContent = () => {
    setShow(!show)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleShowContent
    }
  })

  return (
    <>
      <div style={{ display: show ? 'none' : '' }}>
        <button onClick={toggleShowContent}>{props.buttonLabel}</button>
      </div>
      <div style={{ display: show ? '' : 'none' }}>
        {props.children}
        <button onClick={toggleShowContent}>cancel</button>
      </div>
    </>
  )
})

ToggleVisibility.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

ToggleVisibility.displayName = 'ToggleVisibility'

export default ToggleVisibility
