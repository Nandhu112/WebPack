import { Avatar, Box, Grid, Heading, Text, VStack, Button, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useGetDoctorInfoQuery } from "../../slices/doctorApiSlice"
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import UpdateImageDoctor from './UpdateImageDoctor';
import VerificationDoctor from './VerificationDoctor';

function DoctorProfile() {
  const navigate = useNavigate();
  const { doctorInfo } = useSelector((state) => state.doctorAuth)
  const [roomId, setroomId] = useState('')

  const { data: fetchDoctorInfo, isLoading, refetch } = useGetDoctorInfoQuery({ id: doctorInfo._id })

  useEffect(() => {
    console.log(fetchDoctorInfo, 'fetchDoctorInfo')
  }, [])

  const handleRoom = () => {
    console.log(roomId, "roomId")
    navigate(`/doctor/room/${roomId}`);
  }


  return (
    <Box minHeight="100vh" p={4} display="flex" justifyContent="center" alignItems="center">
      <Box p={4} maxW="600px" bg="white" borderRadius="lg" boxShadow="md">
        <Grid templateColumns="1fr 2fr" gap={8}>
          {/* Avatar */}
          <Box bg="blue.200" borderRadius="md" p={2} display="grid" justifyContent="center" alignItems="center">

            <Avatar size="2xl" name={fetchDoctorInfo?.name} src={fetchDoctorInfo?.profileImage} />

            <UpdateImageDoctor refetch={refetch} />
          </Box>

          {/* Personal Data */}
          <Box bg="gray.200" borderRadius="md" p={2}>
            <VStack align="flex-start" spacing={2} color='gray.600'>

              {fetchDoctorInfo ? name = fetchDoctorInfo.name : name = ""}
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
              <Text>
                <strong></strong>{" "}
                <span style={{ color: fetchDoctorInfo?.verification ? "green" : "red" }}>
                  {fetchDoctorInfo?.verification ? "Verified" : "Not Verified"}
                </span>
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
        <Input onChange={(e) => setroomId(e.target.value)} placeholder='Basic usage' />
        <Button colorScheme='blue' m="5" onClick={handleRoom}>Create Room</Button>
        <VerificationDoctor/>
      </Box>
    </Box>

  )
}

export default DoctorProfile
