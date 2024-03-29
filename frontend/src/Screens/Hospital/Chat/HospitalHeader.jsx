import React from "react";
import { Flex, Avatar, AvatarBadge, Text } from "@chakra-ui/react";

const HospitalHeader = ({senderName,senderImage}) => {
  return (
    <Flex w="100%" pl="5">
      <Avatar size="lg" name={senderName} src={senderImage}>
      </Avatar>
      <Flex flexDirection="column" mx="5" justify="center">
        <Text fontSize="lg" fontWeight="bold">
          {senderName}
        </Text>
      </Flex>
    </Flex>
  );
};

export default HospitalHeader;
