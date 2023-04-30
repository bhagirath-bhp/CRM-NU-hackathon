import React from 'react'
import "../styles/reviewscoreboard.css"

const Reviewscoreboard = (props) => {
  return (
    <div className='review-scoreboard'>
        <div className="scoreboard-count">{props.count}</div>
        <div className="scoreboard-average">{props.average}</div>
        <div className="scoreboard-percentage">{props.percentage}</div>
    </div>
  )
}

export default Reviewscoreboard