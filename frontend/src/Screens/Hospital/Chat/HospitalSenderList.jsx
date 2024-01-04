import { Box, Heading, Avatar, AvatarBadge, Flex, Button } from '@chakra-ui/react';
import React from 'react';
// import Header from './Header';
// import Divider from './Divider';
import HospitalDivider from "./HospitalDivider";
import HospitalHeader from "./HospitalHeader";

import { useSelector } from "react-redux";


function HospitalSenderList({setRoomId,setUser,roomId,setPreRoomId,setSenderId,unreaded,unreadedChk,
                           setUnreadedChk,hospitalChatList,setMessageOpen,refetchUserMessageList,
                           setSenderImage,setSenderName}) {
  const { hospitalInfo } = useSelector((state) => state.hospitalAuth)

  const setRoomhandle = (data) => {
    refetchUserMessageList()
    setMessageOpen(true)
    setPreRoomId(roomId)
    setRoomId(data._id)
    setSenderId(data.user._id)
    setUnreadedChk(false)
    setUser(data.user._id)
    setSenderName(data.user.name)
    setSenderImage(data.user.profileImage)
  }
const fun=()=>{
  console.log(hospitalChatList[0].user.profileImage,"hospitalChatList")
}
  return (
    <Box ml={{ base: "5", md: '5' }} display="flex" flexDirection="column">
      <Box mb={4}>
        <Heading as="h2" size="md" pt="6" pb="4">
          Sender name
        </Heading>
        <HospitalDivider />
      </Box>
      <Box maxHeight={{ base: 'unset', md: '700px' }} overflowY={{ base: 'unset', md: 'auto' }}>
        {hospitalChatList?.map((sender) => (
          <Box  onClick={() => setRoomhandle(sender)}   _hover={{ cursor: 'pointer' }} key={sender.id}>
            <Flex align="center" p={3}>
        <Avatar size="sm" name={sender.user?.name} src={sender.user?.profileImage}>
         {unreadedChk && sender.unreaded?<AvatarBadge boxSize="1.25em" bg="green.500" />:null}
        </Avatar>
        <Heading as="h2" size="md" ml={3}>
          {sender.user?.name}
        </Heading>
      </Flex>
            <HospitalDivider />
          </Box>
        ))}
      </Box>
      {/* <Button onClick={fun}>hii</Button> */}
    </Box>
  );
}

export default HospitalSenderList;
