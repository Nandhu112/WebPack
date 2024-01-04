import React from 'react'
import { ChakraProvider, Box, Input, Button, Flex, VStack, Text, Grid, GridItem, CSSReset } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import io from 'socket.io-client'
const ENDPOINT = "http://localhost:5000"
let socket,selectedChatCompare
function Chat() {
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState([]);
    function sendMessage() {
      console.log("Button clicked",message);
      socket.emit("send_message", { message });
    }
    useEffect(() => {
      socket = io(ENDPOINT)
      socket.on("receive_message", (data) => {
        console.log(data.message)
        // setMessageReceived(prevMessages => [...prevMessages, data.message]);
      });
    }, [socket]);
  
    const fun =()=>{
      console.log(data.message,"data.message")
      console.log(messageReceived,"messageReceived")
    }

    //sssssssssssssssssssssssssssssssssssssss

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const chatContainerRef = useRef(null);
  
    const handleMessageSend = () => {
      if (newMessage.trim() !== "") {
        setMessages([...messages, { text: newMessage, sender: "user" }]);
        setNewMessage("");
      }
    };
  
    useEffect(() => {
      // Scroll to the bottom when a new message is added
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, [messages]);
  return (
    <div className="App">
      <input
        placeholder="Message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}>Send message</button>
      {messageReceived && messageReceived.map((item, index) => (
  <h1 key={index}>
    Message: {item}
  </h1>
))}
         <button onClick={fun}>chkk </button>
    </div>
  );
}

export default Chat
