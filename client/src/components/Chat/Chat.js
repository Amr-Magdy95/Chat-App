import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar.js";
import Input from "../Input/Input.js";
import Messages from "../Messages/Messages.js";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [feedback, setFeedback] = useState("");
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

  }, [messages]);
  
  useEffect ( ()=>{
    if (message) {
      socket.emit("startedTyping", { name, room });
    }
    if (message.length == 0) {
      socket.emit("stoppedTyping", room)
    }
    

  }, [message]);

  useEffect(()=>{
    
    socket.on('addFeedback', (name)=>{
      setFeedback(`${name} is typing a message`)
    })
    socket.on('removeFeedback', (room)=>{
      setFeedback('')
    })
  }, []);

  
  

  // function for sending messages
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
      socket.emit("stoppedTyping", room)
    }
  };

  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="innerContainer">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <div>{feedback}</div>
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
