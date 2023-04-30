import React, { useState, useEffect } from "react";
import ChatItem from "../components/chatitem";
import ProfileImage from "../components/profileImage";
import "../styles/chat.css";
import { AiOutlineSend } from "react-icons/ai";
import { BsMic } from "react-icons/bs";
import EventMessage from "../components/eventmessage";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import ReviewiItem from "../components/reviewitem";
import Reviewscoreboard from "../components/reviewscoreboard";
import ReviewList from "../components/reviewlist";
import Axios from "axios";

const Chat = () => {
  let name = "CRMNU ChatBot";
  let count = 1;
  let msgData = [];
  const [input, setInput] = useState("");
  const date = new Date();

  const chatDataSubmitt = () => {
    let temp = {
      Key: count,
      type: "chat-sent",
      message: input,
      time: date.getHours() + ":" + date.getMinutes(),
      name: "Alok Jain",
      profileurl: "https://picsum.photos/200",
    };
    count += 1;
    setInput("");
    console.log(temp);
  };

  //speech recognition
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const buttonControl = () => {
    if (listening == true) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening();
    }
  };
  useEffect(() => {
    setInput(transcript);
  }, [transcript]);
  //speech recognition

  //rendering chats
  let chatsarray = [
    {
      Key: 1,
      type: "chat-sent",
      message:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos amet, veniam eum qui, voluptatem cupiditate voluptatum harum ratione veritatis vero, deleniti quod iure sapiente rerum. Officiis voluptates dolor nihil recusandae hic neque illum ratione? Tempora quo impedit illum aperiam deleniti tempore vero non vitae natus quod ducimus assumenda, laboriosam quae dicta, unde, ipsa obcaecati eius. Eum et dolorem accusamus. Quis tempore repellat, voluptatum alias facere sint rerum blanditiis aut, unde quos magni aperiam eius quasi laudantium cupiditate a incidunt. Provident dolorem et culpa voluptatem aspernatur consectetur consequatur sint deleniti explicabo qui debitis, dolores, quisquam fugit quos sapiente laborum aperiam reprehenderit?",
      time: "7:20",
      name: "Alok Jain",
      profileurl: "https://picsum.photos/200",
    },
    {
      Key: 2,
      type: "chat-sent",
      message: "hello",
      time: "7:20",
      name: "Alok Jain",
      profileurl: "https://picsum.photos/200",
    },
  ];
  const [chatHtmlArray, setChatHtmlArray] = useState([]);
  useEffect(() => {
    setChatHtmlArray([
      ...chatHtmlArray,
      chatsarray.map((chat) => (
        <ChatItem
          key={chat.Key}
          type={chat.type}
          message={chat.message}
          time={chat.time}
          name={chat.name}
          profileurl="https://picsum.photos/200"
        />
      )),
    ]);
  }, []);
  //rendering chats

  //relove query
  const resolveQuery = (query) => {
    Axios.post(
      query
    ).then((response) => {
      console.log(response);
      console.log(query + ": " + response.data);
      setChatHtmlArray([
        ...chatHtmlArray,
        <ChatItem
          key={Math.random() * 1000}
          type="chat-recieved"
          message={response.data}
          time={date.getHours() + ":" + date.getMinutes()}
          name="chatbot"
          profileurl="https://picsum.photos/200"
        />,
      ]);
    });
  }
  //relove query

  //submitting chat
  const submitData = async (instance) => {
    instance.preventDefault();
    const random_svalue = Math.random() * 1000;
    const query = "http://localhost:8000/q?data=" + instance.target[0].value
    await setChatHtmlArray([
      ...chatHtmlArray,
      <ChatItem
        key={random_svalue}
        type="chat-sent"
        message={instance.target[0].value}
        time={date.getHours() + ":" + date.getMinutes()}
        name="jawaharlal"
        profileurl="https://picsum.photos/200"
      />,
    ]);
    await chatsarray.push({
      Key: random_svalue,
      type: "chat-sent",
      message: instance.target[0].value,
      time: "7:20",
      name: "Alok Jain",
      profileurl: "https://picsum.photos/200",
    });
    resolveQuery(query);
  };


  return (
    <div className="chat">
      <div className="header">
        <div className="logo">
          <ProfileImage url="https://picsum.photos/201" />
        </div>
        <div className="name">{name}</div>
        <div className="bot-select">
          <select>
            <option>ChatBot</option>
            <option>CallBot</option>
          </select>
        </div>
      </div>
      <div className="chat-area">
        {chatHtmlArray}
        {/* <ReviewList/> */}
      </div>
      <div className="typing-area">
        <form onSubmit={submitData}>
          <input
            type="text"
            value={input}
            onInput={(e) => setInput(e.target.value)}
          />
          <div className="chat-btns">
            <button
              onClick={(e) => {
                e.preventDefault();
                buttonControl();
              }}
            >
              <BsMic />
            </button>
            <button type="submit">
              <AiOutlineSend />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Chat;
