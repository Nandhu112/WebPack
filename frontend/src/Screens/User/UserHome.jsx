import React, { useState } from 'react'
import Header from '../../Components/User/UserHeader.jsx';
import SignUp from '../../Components/User/UserSignUp.jsx';
import Image from '../../Components/User/Images.jsx';
import Cards from '../../Components/User/Cards.jsx';
import AddNewMember from './AddNewMember.jsx';
import { useListAllMembersQuery } from "../../slices/userApiSlice.js"
import { useSelector } from "react-redux";
import {
  Button,
  Box,
  Heading,
  Center
} from '@chakra-ui/react'
import Departments from './Departments.jsx';
import Services from './Services.jsx';
import ChatAccordion from './Chat/ChatAccordion.jsx';


function UserHome() {

  const { userInfo } = useSelector((state) => state.auth)
  const _id = userInfo._id
  const { data: members, refetch } = useListAllMembersQuery({ _id })
  const [rating, setRating] = useState(0);

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
 
      <Box mt="50" mb="50" bg="#087c9c">
      <Center>
      <Heading pt="20" color="white">What Would You Like To Do Today?</Heading>
      </Center>
      <Center >
        <Box mt="50" mb="20">
        <Services/>
        </Box>
        </Center>

      </Box>
 
      <Box mt="50" >
      <Box  m="50" >
      <Departments/>
      </Box>
      </Box>
  

      {/* <HospitalRating  /> */}
      {/* <Box maxW="220" position="sticky" bottom="10px">
        <ChatAccordion />
      </Box> */}

    </Box>
  )
}

export default UserHome

