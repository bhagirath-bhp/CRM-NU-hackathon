import React from "react";
import ProfileImage from "../components/profileImage";
import '../styles/reviewitem.css'

const ReviewiItem = (props) => {
  return (
    <div className="review-item">
      <div className="review-profile">
        <ProfileImage url={props.profileurl} />
      </div>
      <div className={"reviw-item-content"}>
        <div className="review-details">
          <div className="rsender-name">{props.name}</div>
          <div className="review-score">{props.score}</div>
          <div className="rsend-time">{props.time}</div>
        </div>
        <div className="review-text">{props.message}</div>
      </div>
    </div>
  );
};

export default ReviewiItem;
