import { Box, Heading, Avatar, AvatarBadge, Flex, Button } from '@chakra-ui/react';
import React ,{useState}from 'react';
import Header from './Header';
import Divider from './Divider';

import { useSelector } from "react-redux";
import { Divider as ChakraDivider } from "@chakra-ui/react";

function SenderList({ setRoomId,roomId,setPreRoomId,setSenderId,userChatList,unreadedChk, setUnreadedChk,
                    refetchUserMessageList,setSenderName,setMessageOpen,setSenderImage}) {
  const { userInfo } = useSelector((state) => state.auth)
  const [colorChange, setColorChange] = useState("")
  const setRoomhandle = (sender) => {
    refetchUserMessageList()
    setSenderName(sender.hospital.name)
    setSenderImage(sender.hospital.profileImage)
    setColorChange(sender.hospital._id)
    setSenderId(sender.hospital._id)
    setMessageOpen(true)
    setPreRoomId(roomId)
    setUnreadedChk(false)
    setRoomId(sender._id)

  }

  return (
    <Box display="flex" flexDirection="column"  style={{  bottom: '100%', width: '100%', margin: 0, padding: 0 }}  >
    <Box >
      <Heading as="h2" size="md" pt="8" pb="4" pl="10">
        Messaging
      </Heading>
      <ChakraDivider w="100%" borderBottomWidth="3px"  borderColor="gray.300"  mt="5" />
    </Box>
  
    <Box maxHeight="100%" overflowY={{ base: 'unset', md: 'auto' }} maxH="500">
      {userChatList?.map((sender) => (
        <Box onClick={() => setRoomhandle(sender)} _hover={{ cursor: 'pointer' }} key={sender._id} bg={colorChange==sender.hospital._id?"blue.300":"gray.200"}>
          <Flex  pl="2" pr="2" pt="5">
            <Avatar size="sm" name="Sender" src={sender.hospital.profileImage}>
              {unreadedChk && sender.unreaded ? <AvatarBadge boxSize="1.25em" bg="green.500" /> : null}
            </Avatar>
            <Heading as="h2" size="md" ml={3}>
              {sender.hospital.name}
            </Heading>
          </Flex>
          <ChakraDivider w="100%" borderBottomWidth="3px"  borderColor="gray.400"  mt="5" />
        </Box>
      ))}
    </Box>
  </Box>
  
  );
}

export default SenderList;
