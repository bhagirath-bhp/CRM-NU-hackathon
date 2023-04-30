import React from 'react'
import '../styles/navbar.css'

const Navbar = () => {
  return (
    <>
        <div className="navbar">
            <div className="logo">CRMNU</div>
            <ul className="nav-list">
                <li className="nav-item"><a href="" className="nav-item-link">Home</a></li>
                <li className="nav-item"><a href="" className="nav-item-link">Chat</a></li>
                <li className="nav-item"><a href="" className="nav-item-link">Analysis</a></li>
                <li className="nav-item"><a href="" className="nav-item-link">Report an Issue</a></li>
            </ul>
        </div>
    </>
  )
}

export default Navbar