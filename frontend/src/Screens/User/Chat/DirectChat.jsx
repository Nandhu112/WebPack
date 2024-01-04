import { Flex, Box, Modal, ModalOverlay, ModalContent, ModalBody, Button, Icon } from '@chakra-ui/react';
import React, { useState, useEffect } from "react";
import Divider from "./Divider";
import Footer from "./Footer";
import Header from "./Header";
import Messages from "./Messages";
import SenderList from "./SenderList";
import { Divider as ChakraDivider } from "@chakra-ui/react";
import { useUserDirectListMessageQuery } from "../../../slices/userApiSlice"
import axios from 'axios';
import { useSelector } from "react-redux";
import { useSocket } from "../../../Provider/socketProvider";
import { useUserListChatQuery } from "../../../slices/userApiSlice"
import { FaWindowClose } from "react-icons/fa";

const DirectChat = ({ hospitalId, setSirectChatOpen }) => {
  const { userInfo } = useSelector((state) => state.auth)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [senderId, setSenderId] = useState('')
  const [inputMessage, setInputMessage] = useState("");
  const { data: userMessageList, refetch: refetchUserMessageList } = useUserDirectListMessageQuery({ uId:userInfo._id,hId:hospitalId})
  const [isTyping, setIsTyping] = useState(false)
  const [unreaded, setUnreaded] = useState([])
  const { socket, socketConnected } = useSocket();
  const [unreadedChk, setUnreadedChk] = useState(true)
  const [senderName, setSenderName] = useState('')
  const [roomId, setRoomId] = useState("");
  const [preRoomId, setPreRoomId] = useState('')
  
  useEffect(() => {
    setRoomId(userMessageList && userMessageList.length >= 0  ? userMessageList[0]?.chat : null)
  }, [userMessageList])
  

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
      console.log("message received");
      refetchUserMessageList()
      // You might want to handle updating the messages or any other action here
    });
    socket?.on("offlineMessageRecieved", (data) => {
      console.log("offlineMessageRe");
      setUnreadedChk(true)
      console.log("offlineMessageRe 112233");
    });
  }, [socket, roomId]);

  useEffect(() => {
    setSenderId(hospitalId)
  }, [])

  const handleSendMessage = () => {


    if (inputMessage.trim().length) {
        console.log('chkkk handleSendMessage',userInfo._id,hospitalId,roomId,inputMessage);
      try {
        axios.post('/api/users/addMessage', {
          user: userInfo._id,
          hospital: hospitalId,
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
    console.log(userMessageList,"userMessageList")
  }

  const modalHandler=()=>{
    setSirectChatOpen(false)
  }

  return (
     
    <Modal isOpen={true} size="xl">
    <ModalOverlay />
    <ModalContent>
      <ModalBody>
        <Flex ml="5" minW="500" flexDirection="column" bg="white" h="450">
          <Box mt="2" ml="4">
            <Flex>
            <Header senderName={senderName} />
            <Icon onClick={modalHandler} as={FaWindowClose} boxSize={6} cursor="pointer" />
            </Flex>
          </Box>
          <Divider />
          <Messages userMessageList={userMessageList} />
          <Divider />
          <Box mb="4" ml="2" mr="2">
            <Footer
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleSendMessage={handleSendMessage}
            />
          </Box>
        </Flex>
        <Button onClick={fun}>hii</Button>
      </ModalBody>
    </ModalContent>

  </Modal>

  );
};

export default DirectChat;
