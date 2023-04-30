import React, { useState, useEffect } from 'react'
import ChatItem from '../components/chatitem';
import ProfileImage from '../components/profileImage';
import '../styles/chat.css'
import { AiOutlineSend } from 'react-icons/ai'
import { BsMic } from 'react-icons/bs'
import EventMessage from '../components/eventmessage';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Navigate, useNavigate } from 'react-router-dom';

const CallBot = () => {
  let name = 'CRMNU CalllBot';
    let count = 1;
    let msgData= [];
    const [input, setInput] = useState('');
    const date = new Date();

    const chatDataSubmitt = ()=>{
      let temp = {
          Key:count,
          type:"chat-sent",
          message:input,
          time:date.getHours() + ':' + date.getMinutes(),
          name:"Alok Jain",
          profileurl:'https://picsum.photos/200'
      }
      count+=1;
      setInput('');
      console.log(temp);
    }

    
  //speech recognition
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const buttonControl = () =>{
    if(listening == true)
    {
      SpeechRecognition.stopListening();
    }
    else{
      SpeechRecognition.startListening();
    }
  }
  useEffect(()=>{
    setInput(transcript);
  },[transcript])
  //speech recognition




  //rendering chats
  let chatsarray = [
    {    
      Key:1,
      type:"chat-sent",
      message:"cha muda",
      time: "7:20",
      name:"Alok Jain",
      profileurl:'https://picsum.photos/200'
    },
    {    
      Key:2,
      type:"chat-sent",
      message:"cha muda",
      time: "7:20",
      name:"Alok Jain",
      profileurl:'https://picsum.photos/200'
    },
  ];
  const [chatHtmlArray, setChatHtmlArray] = useState([]);
  useEffect(()=>{
    setChatHtmlArray([...chatHtmlArray,chatsarray.map(chat => (<ChatItem key={chat.Key} type={chat.type} message={chat.message} time={chat.time} name={chat.name} profileurl="https://picsum.photos/200"/>))]);
  }, [])
  //rendering chats


  //submitting chat
  const submitData = (instance) => {
    instance.preventDefault();
    const random_svalue = Math.random() * 1000;
    setChatHtmlArray([...chatHtmlArray, <ChatItem key={random_svalue} type="chat-sent" message={instance.target[0].value} time={date.getHours() + ':' + date.getMinutes()} name="jawaharlal" profileurl="https://picsum.photos/200" />]);
    chatsarray.push({Key:random_svalue, type:"chat-sent", message:instance.target[0].value, time: "7:20", name:"Alok Jain", profileurl:'https://picsum.photos/200'})
  }
  //submitting chat


  //bot-select
  const navigate = useNavigate();
  const botSelect = (instance) => {
    if(instance.target.value === "CallBot"){
      console.log("called");
      ()=>{navigate("/bot/call");}
      // <Navigate replace={true} to="/bot/call"/>
    }
    else{
      console.log("chatted");
      ()=>{navigate("/bot/chat");}
      // navigate("/bot/chat");
      // <Navigate replace={true} to="/bot/chat"/>
    }
  }
  //bot-select

  return (
    <div className='chat'>
        <div className="header">
            <div className="logo"><ProfileImage url="https://picsum.photos/201"/></div>
            <div className="name">{name}</div>
            <div className="bot-select">
              <select onChange={botSelect}>  
                <option>ChatBot</option>
                <option>CallBot</option>
              </select>
            </div>
        </div>
        <div className="chat-area">
            {/* <ChatItem key={1} type="chat-recieved" message="Lorem ipsum dolor, sit Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, minima!" time="7:30" name="Alok Jain" profileurl='https://picsum.photos/200'/>
            <ChatItem key={2} type="chat-sent" message="Lorem ipsum dolor, sit Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, minima!" time="7:30" name="Alok Jain" profileurl='https://picsum.photos/200'/>
            <ChatItem key={3} type="chat-recieved" message="Lorem ipsum dolor, sit Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, minima!" time="7:30" name="Alok Jain" profileurl='https://picsum.photos/200'/>
            <ChatItem key={4} type="chat-recieved" message="Lorem ipsum dolor, sit Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, minima!" time="7:30" name="Alok Jain" profileurl='https://picsum.photos/200'/>
            <ChatItem key={5} type="chat-sent" message="Lorem ipsum dolor, sit Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, minima!" time="7:30" name="Alok Jain" profileurl='https://picsum.photos/200'/>
            <ChatItem key={6} type="chat-recieved" message="Lorem ipsum dolor, sit Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, minima!" time="7:30" name="Alok Jain" profileurl='https://picsum.photos/200'/>
            <EventMessage message="something went wrong"/> */}
            {chatHtmlArray}
        </div>
        <div className="typing-area">
          <form onSubmit={submitData}> 
            <input type="text" value={input} onInput={e => setInput(e.target.value)} />
            <div className="chat-btns">
              <button onClick={(e)=>{e.preventDefault();
              buttonControl()}}><BsMic/></button>
              <button type='submit'><AiOutlineSend/></button>
            </div>
          </form>
        </div>
    </div>
  )
}
export default CallBot