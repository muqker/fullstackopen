import React, { useImperativeHandle, useState } from 'react'

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

export default ToggleVisibility
