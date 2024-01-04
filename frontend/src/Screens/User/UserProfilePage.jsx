import React from 'react'
import { Box, Flex, Text, Button, Image, Grid, Center, Avatar, Heading } from '@chakra-ui/react';
import { useSelector, useDispatch } from "react-redux";

function UserProfilePage() {
    const { userInfo } = useSelector((state) => state.auth);
  return (
    <Box className="gradient-custom-2" h="100vh">
    <Flex justifyContent="center" alignItems="center" h="100%">
        <Box w="100%" maxW="xl">
            <Box bg="#fff" rounded="lg" boxShadow="lg">
                <Flex
                    roundedTop="lg"
                    color="white"
                    bg="blue.400"
                    justify="space-between"
                    p="4"
                >
                    <Flex >
                        <Box ml="5" bg="blue.200" p="2" borderRadius={"xl"}>
                            <Flex>
                                <Avatar size="xl" name="ff" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp" />
                                <Box pt="5" pl="2">
                                    <Heading color='black' fontSize="20">{userInfo.name}</Heading>
                                    <Text color='black' fontSize="15">{userInfo.email}</Text>
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
      
                </Flex>
                <Box bg="gray.100" p="4">
                 
                </Box>
                <Box p="4">
                    <Box mb="5">

                        <Box bg="gray.100" p="4">
                           
                        </Box>
                    </Box>
                    <Box mb="5">

                        <Box bg="gray.100" p="4">
                                               
                            <Box mt="10">
                            </Box>

                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Flex>
</Box>
  )
}

export default UserProfilePage
