import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Divider from "./Divider";
import Footer from "./Footer";
import Header from "./Header";
import Messages from "./Messages";
import SenderList from "./SenderList";
import { Divider as ChakraDivider } from "@chakra-ui/react";
import { useUserListMessageQuery } from "../../../slices/userApiSlice"
import axios from 'axios';
import { useSelector } from "react-redux";
import { useSocket } from "../../../Provider/socketProvider";
import { useUserListChatQuery } from "../../../slices/userApiSlice"

const UserChat = ({ messageOpen, setMessageOpen }) => {
  const { userInfo } = useSelector((state) => state.auth)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [roomId, setRoomId] = useState('')
  const [preRoomId, setPreRoomId] = useState('')
  const [senderId, setSenderId] = useState('')
  const [inputMessage, setInputMessage] = useState("");
  const { data: userMessageList, refetch: refetchUserMessageList } = useUserListMessageQuery({ _id: roomId })
  const { data: userChatList, refetch: refetchUserChatList } = useUserListChatQuery({ _id: userInfo._id, })
  // const [socketConnected, setSocketConnected] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [unreaded, setUnreaded] = useState([])
  const { socket, socketConnected } = useSocket();
  const [unreadedChk, setUnreadedChk] = useState(true)
  const [senderName, setSenderName] = useState('')
  const [senderImage, setSenderImage] = useState('')



  useEffect(() => {

    socket?.on("typing", () => setIsTyping(true));
    socket?.on("stop typing", () => setIsTyping(false));
    // socket.on("message recieved", () => console.log("io connected"));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let data = {
      roomId,
      preRoomId,
      sender: userInfo._id
    }
    if (roomId) {
      socket?.emit("join chat", data);
    }
    socket?.on("messageRecieved", () => {
      refetchUserMessageList()
      // You might want to handle updating the messages or any other action here
    });
    socket?.on("offlineMessageRecieved", (data) => {
      refetchUserChatList()
      setUnreadedChk(true)
    });
  }, [socket, roomId]);




  const newMessageHandler = () => {
    console.log("new msg received")
  }


  const handleSendMessage = () => {

    console.log('chkkk handleSendMessage', inputMessage);
    if (inputMessage.trim().length) {
      try {
        axios.post('/api/users/addMessage', {
          user: userInfo._id,
          hospital: senderId,
          content: inputMessage,
          chat: roomId,
          isUser: true
        });
        let data = {
          senderId,
          roomId
        }
        socket?.emit("new message", data);
        refetchUserMessageList()
        refetchUserChatList()
        console.log('Data sent successfully');
      } catch (error) {
        console.log('Error sending data to the backend', error);
      }
    }
    const data = inputMessage;

    setMessages((old) => [...old, { from: "me", text: data }]);
    setInputMessage("");

    setTimeout(() => {
      setMessages((old) => [...old, { from: "computer", text: data }]);
    }, 1000);
  };

  return (

    <Flex  h="450"    >
      {/* Left Sidebar */}
    <Box minW="220" bg="white" >
      <SenderList setRoomId={setRoomId} roomId={roomId} setPreRoomId={setPreRoomId} setSenderId={setSenderId}
        unreaded={unreaded} userChatList={userChatList} unreadedChk={unreadedChk} setUnreadedChk={setUnreadedChk}
       refetchUserMessageList={refetchUserMessageList} setSenderName={setSenderName} setMessageOpen={setMessageOpen}
       setSenderImage={setSenderImage}/>
  
      {/* Vertical Divider */}
      </Box>
      {messageOpen? <>
          {/* Chat Interface */}
          
          <Flex ml="5" w={["80%", "80%", "70%"]} flexDirection="column" bg="white" >
            <Box mt="2" ml="4" >
            <Header senderName={senderName} senderImage={senderImage}/>
            </Box>
            <Divider />  
            <Messages userMessageList={userMessageList} senderImage={senderImage} senderName={senderName} />
            <Divider />
            <Box mb="4" ml="2" mr="2">
            <Footer
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleSendMessage={handleSendMessage}
            />
            </Box>
            
          </Flex></>:null}
    </Flex>
  );
};

export default UserChat;
