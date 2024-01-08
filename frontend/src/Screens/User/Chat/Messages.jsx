import React, { useEffect, useRef } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";

const Messages = ({ userMessageList, senderImage, senderName }) => {
  const scrollRef = useRef();

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [userMessageList]);

  return (
    <Flex
      w="100%"
      h="80%"
      overflowY="scroll"
      flexDirection="column"
      pl="5"
      ref={scrollRef}
    >
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
              />
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
    </Flex>
  );
};

export default Messages;
