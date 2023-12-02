import { Avatar, Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React,{useEffect, useState} from 'react'
import { useGetDoctorInfoQuery } from "../../slices/doctorApiSlice"
import { useSelector } from "react-redux";
import UpdateImageDoctor from './UpdateImageDoctor';

function DoctorProfile() {

    const { doctorInfo } = useSelector((state) => state.doctorAuth)
  
    const { data: fetchDoctorInfo,isLoading, refetch } = useGetDoctorInfoQuery({ id: doctorInfo._id })

    useEffect(() => {  
     console.log(fetchDoctorInfo,'fetchDoctorInfo')
    }, [])
    

    
  return (
    <Box  minHeight="100vh" p={4} display="flex" justifyContent="center" alignItems="center">
      <Box p={4} maxW="600px" bg="white" borderRadius="lg" boxShadow="md">
        <Grid templateColumns="1fr 2fr" gap={8}>
          {/* Avatar */}
          <Box bg="blue.200" borderRadius="md" p={2} display="grid" justifyContent="center" alignItems="center">
    
         <Avatar size="2xl" name='kk' src={fetchDoctorInfo?.profileImage} />
         
            <UpdateImageDoctor refetch={refetch}/>
          </Box>
          
          {/* Personal Data */}
          <Box bg="gray.200" borderRadius="md" p={2}>
            <VStack align="flex-start" spacing={2} color='gray.600'>
            
            {fetchDoctorInfo ? name=fetchDoctorInfo.name : name=""}
              <Heading size="md">{name}</Heading>
        
              <Text>
                <strong></strong> {fetchDoctorInfo?.title}
              </Text>
             
              <Text>
                <strong></strong> {fetchDoctorInfo?.department}
              </Text>

              <Text>
                <strong></strong> {fetchDoctorInfo?.qualification}
              </Text>
              
            </VStack>
          </Box>
        </Grid>

        {/* Details */}
        <Box bg="gray.200" borderRadius="md" p={4} mt={4}>
          <VStack align="flex-start" spacing={2}>
    
            <Text color='gray.600'>
              <strong>About:</strong> {fetchDoctorInfo?.description}
            </Text>
            {/* Add more details as needed */}
          </VStack>
        </Box>
      </Box>
    </Box>
  
  )
}

export default DoctorProfile
