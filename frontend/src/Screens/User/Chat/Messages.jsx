import React, { useEffect, useRef } from "react";
import { Avatar, Button, Flex, Text } from "@chakra-ui/react";


const Messages = ({ userMessageList,senderImage,senderName}) => {

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  return (
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" pl="5" >
    {userMessageList?.map((item, index) => {
      if (item.isUser) {
        return (
          <Flex key={index} w="100%" justify="flex-end">
            <Flex
              bg="black"
              color="white"
              minW="100px"
              maxW="350px"
              my="1"
              p="3"
            >
              <Text>{item.content}</Text>
            </Flex>
          </Flex>
        );
      } else {
        return (
          <Flex key={index} w="100%">
            <Avatar
              size={"sm"}
              name={senderName}
              src={senderImage}
              bg="blue.300"
            ></Avatar>
            <Flex
              bg="gray.100"
              color="black"
              minW="100px"
              maxW="350px"
              my="1"
              p="3"
            >
              <Text>{item.content}</Text>
            </Flex>
          </Flex>
        );
      }
    })}
   <AlwaysScrollToBottom />
  </Flex>
  );
};

export default Messages;
