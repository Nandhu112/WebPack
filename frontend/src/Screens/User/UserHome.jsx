import React from 'react'
import Header from '../../Components/User/UserHeader.jsx';
import SignUp from '../../Components/User/UserSignUp.jsx';
import Image from '../../Components/User/Images.jsx';
import Cards from '../../Components/User/Cards.jsx';
import AddNewMember from './AddNewMember.jsx';
import { useListAllMembersQuery} from "../../slices/userApiSlice.js"
import { useSelector } from "react-redux";
import {
  Button,
  Box  
} from '@chakra-ui/react'

function UserHome() {

  const { userInfo } = useSelector((state) => state.auth)
  const _id=userInfo._id
  const { data: members,  refetch } = useListAllMembersQuery({_id})


  return (
  <Box bg="blue.200" >
  {/* <Header/> */}
  <Image/>
  <Box maxW='800px' >
    {members && members?.map((item,index) =>     
      <Cards item={item} refetch={refetch}/>

    )}
  </Box>
  <AddNewMember refetch={refetch} />
  </Box>
  )
}

export default UserHome

