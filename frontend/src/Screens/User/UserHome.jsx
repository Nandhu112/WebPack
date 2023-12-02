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
  const { data: members, isLoading, refetch } = useListAllMembersQuery({_id})


  return (
 <div style={{ backgroundColor: '#f5f5f5' }}> {/* Use any color code for a light background */}
  {/* <Header/> */}
  <Image/>
  <Box maxW='800px' >
    {members && members?.map((item,index) =>     
      <Cards item={item}/>
    )}
  </Box>
  <AddNewMember refetch={refetch} />
</div>
  )
}

export default UserHome

