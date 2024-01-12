import React,{useRef} from 'react'
import { Box, Flex, Text, Button, Image, Grid, Center, Avatar, Heading,useDisclosure, } from '@chakra-ui/react';
import { useSelector, useDispatch } from "react-redux";
import { useListAllMembersQuery } from "../../slices/userApiSlice.js"
import Cards from '../../Components/User/Cards.jsx';
import AddNewMember from './AddNewMember.jsx';
import { IoIosAddCircle } from "react-icons/io";

function UserProfilePage() {
    const addNewMemberRef = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { userInfo } = useSelector((state) => state.auth);
    const { data: members, refetch } = useListAllMembersQuery({_id:userInfo?._id})
    const openAddmember=()=>{
        onOpen()
    }
    return (

                    <Box bg="#fff" rounded="lg" boxShadow="lg">
                        <Flex
                            roundedTop="lg"
                            color="white"
                            bg="blue.400"
                            justify="space-between"
                            p="4"
                        >
                            <Flex >
                                <Box ml="5" bg="blue.200" p="2" borderRadius={"xl"} minW="500">
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

                        <Box p="4">
                            {/* <Box mb="5">

                                <Box bg="gray.100" p="4">

                                </Box>
                            </Box> */}
                            <Box mb="5">

                                <Box bg="gray.100" p="4">

                                {members?.length>0?    <>
                                    <Box maxW='800px' >
                                        {members && members?.map((item, index) =>
                                            <Cards item={item} refetch={refetch} />

                                        )}
                                    </Box>
                                     <AddNewMember refetch={refetch} isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
                                     </>
                                     :
                                     <Center onClick={openAddmember} fontSize={'5xl'} textColor={"blue.300"}> 
                                     <IoIosAddCircle />
                                     <Text fontSize={'md'} >Add members</Text>
                                     </Center>
                                    }
                                </Box >                      
                               <Box hidden><AddNewMember refetch={refetch} isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
        </Box>
                            </Box>
                        </Box>
                    </Box>
   
    )
}

export default UserProfilePage
