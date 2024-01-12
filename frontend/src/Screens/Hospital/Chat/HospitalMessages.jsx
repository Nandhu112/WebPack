import React, { useEffect, useRef } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";

const HospitalMessages = ({ userMessageList }) => {
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
              <Text>{item.content}</Text>
            </Flex>
          </Flex>
        );
      } else {
        return (
          <Flex key={index} w="100%">
            <Avatar
              name="Computer"
              src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
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

export default HospitalMessages;
