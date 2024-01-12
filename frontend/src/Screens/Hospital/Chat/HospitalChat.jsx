import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useState,useEffect } from "react";
import HospitalDivider from "./HospitalDivider";
import HospitalFooter from "./HospitalFooter";
import HospitalHeader from "./HospitalHeader";
import HospitalMessages from "./HospitalMessages";
import HospitalSenderList from "./HospitalSenderList";
import { Divider as ChakraDivider } from "@chakra-ui/react";
import axios from 'axios';
import{useHospitalListMessageQuery} from "../../../slices/hospitalApiSlice"
import {useHospitalListChatQuery}from "../../../slices/hospitalApiSlice"
import { useSelector } from "react-redux";
import { useSocket } from "../../../Provider/socketProvider";

const HospitalChat = () => {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [roomId, setRoomId] = useState('')
  const [preRoomId, setPreRoomId] = useState('')
  const [senderId, setSenderId] = useState('')
  const [user, setUser] = useState('')
  const [inputMessage, setInputMessage] = useState("");
  const { hospitalInfo } = useSelector((state) => state.hospitalAuth)
  const [unreaded, setUnreaded] = useState([])
  // const [socketConnected, setSocketConnected] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
const { socket, socketConnected } = useSocket()
const [unreadedChk, setUnreadedChk] = useState(true)
const [messageOpen, setMessageOpen] = useState(true)
const [senderName, setSenderName] = useState('')
const [senderImage, setSenderImage] = useState('')

  const { data: userMessageList, refetch: refetchUserMessageList } = useHospitalListMessageQuery({ _id: roomId })
  const { data: hospitalChatList,  refetch: refetchHospitalChatList } = useHospitalListChatQuery({ _id: hospitalInfo._id, })

  useEffect(() => {
    if(socket){
      console.log("socket")
    }
    else{
      console.log("no socket")
    }

    socket?.on("typing", () => setIsTyping(true));
    socket?.on("stop typing", () => setIsTyping(false));

    // socket.on("message recieved", () => console.log("io connected"));

    // eslint-disable-next-line
  }, [socket]);

  // if(roomId){
  //   socket?.emit("join chat", roomId);
  // }
  useEffect(() => {  
    let data={
      roomId,
      preRoomId,
      sender:hospitalInfo._id
    }
    if(roomId){
      socket?.emit("join chat", data);
    }
    socket?.on("messageRecieved", () => {
      console.log("message received");
      refetchHospitalChatList()
      refetchUserMessageList()
      // You might want to handle updating the messages or any other action here
    });
    socket?.on("offlineMessageRecieved", (senderId) => {
      console.log("offlineMessageRecieved");
      refetchHospitalChatList()
      setUnreadedChk(true)
      console.log("offlineMessageRecieved123");
 
    });
    
  },[socket,roomId]);

  const handleSendMessage = () => {

    console.log('chkkk handleSendMessage', inputMessage);
    if (inputMessage.trim().length) {
      try {
        axios.post('/api/hospitals/addMessage', {
          user: user,
          hospital:hospitalInfo._id,
          content: inputMessage,
          chat: roomId

        });
        let data={
          senderId,
          roomId
        }
        socket.emit("new message",data );
        refetchHospitalChatList()
        refetchUserMessageList()
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
  const fun=()=>{
    console.log(senderName,"senderName")
  }
  return (
    <Box  maxH="200">
    <Flex w="100%"  bg="gray.100" p="10" >
      {/* Left Sidebar */}
      <HospitalSenderList setRoomId={setRoomId} setUser={setUser} roomId={roomId} setPreRoomId={setPreRoomId} setSenderId={setSenderId}
                          unreaded={unreaded} unreadedChk={unreadedChk} setUnreadedChk={setUnreadedChk}hospitalChatList={hospitalChatList}
                          setMessageOpen={setMessageOpen}refetchUserMessageList={refetchUserMessageList} setSenderName={setSenderName}
                          setSenderImage={setSenderImage}/>

      {/* Vertical Divider */}
  {messageOpen?
  <>
  <ChakraDivider orientation="vertical" mx={4} borderColor="gray.400" />

      {/* Chat Interface */}
      <Flex w={["100%", "100%", "100%"]} flexDirection="column">
        <HospitalHeader senderName={senderName} senderImage={senderImage} />
        <HospitalDivider />
        
        <HospitalMessages userMessageList={userMessageList} />
        <HospitalDivider />
        <HospitalFooter
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}

        />
      </Flex></>:null}
      {/* <Button onClick={fun}>hii</Button> */}
    </Flex>
    </Box>
  );
};

export default HospitalChat;
