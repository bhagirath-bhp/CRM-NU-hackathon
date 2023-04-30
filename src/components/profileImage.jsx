import React from 'react'
import '../styles/profileimage.css'

const ProfileImage = (props) => {
  return (
    <div className='profile-image'>
        <img src={props.url}/>
    </div>
  )
}

export default ProfileImage