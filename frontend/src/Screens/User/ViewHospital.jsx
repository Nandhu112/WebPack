import React from 'react'
import HospitalImage from '../Hospital/HospitalHome/HospitalImage'
import HospitalHomeCard from '../Hospital/HospitalHome/HospitalHomeCard'
import Departments from '../Hospital/HospitalHome/Departments'
import HospitalFilter from '../Hospital/HospitalFilter'
import { Box,Flex,Card,Button } from '@chakra-ui/react'
import {useUserListHospitalDoctorsQuery} from "../../slices/userApiSlice"
import { useSelector } from "react-redux";
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

function ViewHospital() {

        const location = useLocation();
        const _id = location.state;
        const { data: doctors, isLoading, refetch } = useUserListHospitalDoctorsQuery({_id})
    
  return (
    <div>
    <HospitalImage />
    <Box mt='10'>
    <Flex>
    <Box className='mt-10 ml-5' >
        <HospitalFilter _id={_id} />
     </Box>
      <Box>
      <Box ml={4}> 
        <Flex flexWrap="wrap"> 
        {doctors && doctors.map((item,index) =>
          <HospitalHomeCard item={item} />
        )}
        </Flex>
      </Box>
      <Box mt="10" ml="5" mb="10">
    </Box>
      </Box>
    </Flex>

    </Box>
  </div>
  )
}

export default ViewHospital
