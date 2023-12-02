
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  Heading,
  Text,
  useDisclosure,
  VStack,
  Avatar,
} from '@chakra-ui/react';
import React,{useEffect, useState} from 'react'
import { useSelector } from "react-redux";
import { useGetPatientInfoQuery } from "../../slices/userApiSlice"
// import UpdateImageDoctor from './UpdateImageDoctor';

function PatientProfile({_id}) {
    // const { doctorInfo } = useSelector((state) => state.doctorAuth)
  
    const { data: fetchPatientInfo,isLoading, refetch } = useGetPatientInfoQuery({ _id})
    const { isOpen, onOpen, onClose } = useDisclosure();
//   const [name, setName] = useState(fetchDoctorInfo ? fetchDoctorInfo.name : '');


  return (
    <>
      {/* Button to open the drawer */}
      <Button colorScheme='blue'  onClick={onOpen}>view Profile</Button>

      {/* The drawer component */}
      <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="lg">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Patient Profile</DrawerHeader>
            <DrawerBody>
              <Grid templateColumns="1fr 2fr" gap={8}>
                {/* Avatar */}
                <Box bg="blue.200" borderRadius="md" p={2} display="grid" justifyContent="center" alignItems="center">
                  <Avatar size="2xl" name={fetchPatientInfo?.name} src="" />
                  {/* Add UpdateImageDoctor component here */}
                </Box>

                {/* Personal Data */}
                <Box bg="gray.200" borderRadius="md" p={2}>
                  <VStack align="flex-start" spacing={2} color="gray.600">
                    <Heading size="md">{name}</Heading>
                    <Text>
                      <strong></strong>{fetchPatientInfo?.name}
                    </Text>
                    <Text>
                      <strong></strong>{fetchPatientInfo?.gender}
                    </Text>
                    <Text>
                      <strong></strong>{fetchPatientInfo?.bloodGroup}
                    </Text>
                    <Text>
                      <strong></strong>{fetchPatientInfo?.dateOfBirth}
                    </Text>
                  </VStack>
                </Box>
              </Grid>

              {/* Details */}
              <Box bg="gray.200" borderRadius="md" p={4} mt={4}>
                <VStack align="flex-start" spacing={2}>
                  <Text color="gray.600">
                    <strong></strong> No Medical Records
                  </Text>
                  {/* Add more details as needed */}
                </VStack>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default PatientProfile
