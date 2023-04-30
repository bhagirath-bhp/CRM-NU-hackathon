import React from 'react'
import '../styles/navbar.css'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <>
        <div className="navbar">
            <div className="logo" style={{color: "#fff"}}>CRMNU</div>
            <ul className="nav-list">
                <li className="nav-item"><a href="" className="nav-item-link">Home</a></li>
                <li className="nav-item"><a href="" className="nav-item-link">Chat</a></li>
                {/* <Link to="/analysis">Analysis</Link> */}
                <li className="nav-item"><a href="" className="nav-item-link">Analysis</a></li>
                <li className="nav-item"><a href="" className="nav-item-link">Report an Issue</a></li>
            </ul>
        </div>
    </>
  )
}

export default Navbar