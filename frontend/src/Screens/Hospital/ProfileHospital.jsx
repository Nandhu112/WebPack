import { Avatar, Box, Grid, Heading, Text, VStack, Image, AspectRatio } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import {useGetHospitalInfoQuery} from "../../slices/hospitalApiSlice"
import ApplyVerification from './HospitalHome/ApplyVerification';
import UpdateHospitalImage from './UpdateHospitalImage';
import { useSelector } from "react-redux";

// import UpdateImageDoctor from './UpdateImageDoctor';

function ProfileHospital() {
  let profile
  const { hospitalInfo } = useSelector((state) => state.hospitalAuth)
  const { data: getHospital,isLoading, refetch } = useGetHospitalInfoQuery({_id: hospitalInfo._id })


  return (
    <Box minHeight="100vh" p={4} display="flex" justifyContent="center" alignItems="center">
    <Box p={4} maxW="600px" bg="white" borderRadius="lg" boxShadow="md">
      <Grid templateColumns="1fr 2fr" gap={8}>
        {/* Avatar */}
        
        {/* Personal Data */}
        <Box borderRadius="md" minW="565">
        
            <Image maxW='100%' src={getHospital?.profileImage} alt='naruto' />
        
           <UpdateHospitalImage refetch={refetch} />
        </Box>
    
      </Grid>
  
      {/* Details */}
      <Box bg="gray.200" borderRadius="md" p={4} mt={4}>
        <VStack align="flex-start" spacing={2}>
          <Text color='gray.600'>
            <strong>Name:</strong> {getHospital?.name}
          </Text>
          <Text color='gray.600'>
            <strong>Type:</strong> {getHospital?.title}
          </Text>
          <Text color='gray.600'>
            <strong>Email:</strong> {getHospital?.email}
          </Text>
          <Text color='gray.600'>
            <strong>Address:</strong> {getHospital?.address}
          </Text>
          <Text color='gray.600'>
            <strong>Departments:</strong> {getHospital?.department.length}
          </Text>
          <Text color='gray.600'>
            <strong>Doctors:</strong> {getHospital?.doctor.length}
          </Text>
          <Text color='gray.600'>
            <strong>Verification status:</strong> {getHospital?.adminVerification? "Verified":"Pending"}
          </Text>
          {/* Add more details as needed */}
        </VStack>
        {getHospital?.adminVerification ? null : <ApplyVerification/> 
         
        }
      </Box>
   
    </Box>
  </Box>

  )
}

export default ProfileHospital
