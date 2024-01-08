import React, { useState } from 'react'
import Header from '../../Components/User/UserHeader.jsx';
import SignUp from '../../Components/User/UserSignUp.jsx';
import Image from '../../Components/User/Images.jsx';
import Cards from '../../Components/User/Cards.jsx';
import AddNewMember from './AddNewMember.jsx';
import { useListAllMembersQuery } from "../../slices/userApiSlice.js"
import UserData from './UserData.jsx';
import { useSelector } from "react-redux";
import {
  Button,
  Box,
  Heading,
  Center,
  Text,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay
} from '@chakra-ui/react'



import Departments from './Departments.jsx';
import Services from './Services.jsx';
import ChatAccordion from './Chat/ChatAccordion.jsx';
import UserProfilePage from './UserProfilePage.jsx';


function UserHome() {

  const { userInfo } = useSelector((state) => state.auth)
  const _id = userInfo._id
  const { data: members, refetch } = useListAllMembersQuery({ _id })
  const [rating, setRating] = useState(0);
  const [openProfile, setOpenProfile] = useState(false)
  


const fun=()=>{
    setOpenProfile(false)
}

  return (
    <Box  >
      {/* <Header/> */}
      <Image />
      {/* <Box maxW='800px' >
        {members && members?.map((item, index) =>
          <Cards item={item} refetch={refetch} />

        )}
      </Box> */}

      {/* <AddNewMember refetch={refetch} /> */}
      <Box   bg="gray.200" >
      <Center>
      <Heading color="#087c9c" pt="20" >Your Personalized Healthcare Hub</Heading>
      </Center>
      <Center>
  <Text pt="10" align="center">Streamline your healthcare information and effortlessly organize your medical history, tests,<br/>and upcoming schedules in one accessible platform.</Text>
</Center>
      <Center >
        <Box mt="50" mb="20">
        <Box
    
         borderWidth="1px"
         borderRadius="lg"
         overflow="hidden"
         boxShadow="md"
         transition="transform 0.2s"
         _hover={{ transform: "scale(1.05)" }}
       >
         <Center>
         </Center>
      <Button onClick={()=>setOpenProfile(true)} colorScheme='blue'>ViewProfile</Button>
       </Box>
        </Box>
        </Center>

      </Box >
 
      <Box  mb="50" bg="#087c9c">
      <Center>
      <Heading pt="20" color="white">What Would You Like To Do Today?</Heading>
      </Center>
      <Center >
        <Box mt="50" mb="20">
        <Services/>
        </Box>
        </Center>

      </Box >
    
      <Box mt="50" >
      <Center pt="10">
       <Heading>Explore our Centres of Clinical Excellence</Heading>
       </Center>
      <Box  m="50" >
      <Departments/>
      </Box>
      </Box>
  

      {/* <HospitalRating  /> */}
      {/* <Box maxW="220" position="sticky" bottom="10px">
        <ChatAccordion />
      </Box> */}

{openProfile && (
        <Drawer isOpen={openProfile} placement="left" onClose={fun} size="lg">
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader> Patient History</DrawerHeader>
              <DrawerBody>
                {/* Replace this with your UserProfile component */}
                <Box mt="20">
                <UserProfilePage  />
                </Box>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      )}


    </Box>
  )
}

export default UserHome

