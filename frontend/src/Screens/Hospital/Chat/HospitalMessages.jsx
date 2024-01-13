import React, { useEffect, useRef } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";

const HospitalMessages = ({ userMessageList,senderImage,senderName }) => {
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  return (
    <Flex w="100%" maxH="300" minH="300" overflowY="scroll" flexDirection="column">
    {userMessageList?.map((item, index) => {
      if (!item.isUser) {
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
              <Text >{item.content}</Text>
            </Flex>
          </Flex>
        );
      } else {
        return (
          < Flex key={index} w="100%" pl="5">
               <Avatar
                size={"sm"}
                name={senderName}
                src={senderImage}
                bg="blue.300"
              />
            <Flex
              bg="gray.300"
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

export default HospitalMessages;
