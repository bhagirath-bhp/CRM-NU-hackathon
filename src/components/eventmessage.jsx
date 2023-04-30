import React from 'react'
import '../styles/eventmessage.css'

const EventMessage = (props) => {
  return (
    <>
        <div className='eventmessage'>{props.message}</div>
    </>
  )
}

export default EventMessage