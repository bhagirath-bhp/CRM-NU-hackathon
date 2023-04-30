import React from "react";
import ProfileImage from "../components/profileImage";
import "../styles/chatitem.css";

const ChatItem = (props) => {
  
  return (props.type=='chat-recieved')
  ? (
    <div className="chat-item">
      <div className="profile"><ProfileImage url={props.profileurl}/></div>
      <div className={`chat-item-content ${props.type}`}>
        <div className="chat-details">
          <div className="sender-name">{props.name}</div>
          <div className="send-time">{props.time}</div>
        </div>
        <div className="chat-text">
          {props.message}
        </div>
      </div>
    </div>
  )
  :
  (
    <div className="chat-item">
      <div className={`chat-item-content ${props.type}`}>
        <div className="chat-details">
          <div className="sender-name">{props.name}</div>
          <div className="send-time">{props.time}</div>
        </div>
        <div className="chat-text">
          {props.message}
        </div>
      </div>
      <div className="profile"><ProfileImage url={props.profileurl}/></div>
    </div>
  )
};

export default ChatItem;
