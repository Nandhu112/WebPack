
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
  Flex

} from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid } from '@chakra-ui/react'
import UserProfile from './MdbProfile';
import React, { useState,useEffect } from 'react'
import { useGetPatientInfoQuery,useGetPatientHistoryQuery,useGetPatientHistoryByAppointmentQuery } from "../../slices/userApiSlice"
import UpdateUserProfile from './UpdateUserProfile';


function PatientProfile({ _id, refetch }) {
  // const { doctorInfo } = useSelector((state) => state.doctorAuth)
  const [appointmentId, setAppointmentId] = useState('')
  const { data: fetchPatientInfo, isLoading, refetch: patientRefetch } = useGetPatientInfoQuery({ _id })
  const { data: fetchPatientHistory,  refetch: refetchPatientHistory } = useGetPatientHistoryQuery({_id })
  const { data: patientHistory, refetch: refetchPatientHistorys } = useGetPatientHistoryByAppointmentQuery({ appointmentId})
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [historyOpen, setHistoryOpen] = useState(false)
  //   const [name, setName] = useState(fetchDoctorInfo ? fetchDoctorInfo.name : '');

  const [isDrawerOpen, setIsDrawerOpen] = useState(historyOpen);

  useEffect(() => {
    setIsDrawerOpen(historyOpen);
  }, [historyOpen]);

const fun=()=>{
  setHistoryOpen(false)
}

 const handleClick=(id)=>{
  // console.log(id,"fetchPatientHistory")
  setAppointmentId(id)
  refetchPatientHistorys()
  setHistoryOpen(true)
 }
 

  return (
    <>
      {/* Button to open the drawer */}
      <Button colorScheme='blue' onClick={onOpen}>view Profile</Button>

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
                  <Avatar size="2xl" name={fetchPatientInfo?.name} src={fetchPatientInfo?.profileImage} />
                  <UpdateUserProfile id={fetchPatientInfo?._id} refetch={refetch} patientRefetch={patientRefetch} />
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
              <Box bg="blue.100" borderRadius="md" p={4} mt={4} minH="390">
                {fetchPatientInfo && fetchPatientInfo.ailments.length == 0 && fetchPatientInfo.allergies.length == 0 ?
                  <Flex>
                    <Text color="gray.600">
                      No medical records
                    </Text>
                    <Box ml="auto" style={{ cursor: 'pointer' }} >
     
                    </Box>
                  </Flex>
                  : <Box>
                    <Flex flexDirection="column">
                      {fetchPatientInfo && !fetchPatientInfo.ailments.length == 0 ?
                        <Box >
                          <Text fontSize="md" fontWeight="bold" mb="3">
                            Enduring health issues
                          </Text>
                          <Box bg="gray.200" p="3" mb="3" borderRadius="md" pb='5' pt="5">
                            <ul>
                              {fetchPatientInfo.ailments.map((item, index) => (
                                <Box pb='2'>
                                  <li pb='2' key={index}>{item}</li>
                                </Box>
                              ))}
                            </ul>
                          </Box>
                        </Box> : null
                      }
                      {fetchPatientInfo && !fetchPatientInfo.allergies.length == 0 ?
                        <Box>
                          <Text fontSize="md" fontWeight="bold" mb="3">
                            Allergies
                          </Text>
                          <Box bg="gray.200" p="3" borderRadius="md" pb='5' pt="5">
                            <ul>
                              {
                                fetchPatientInfo.allergies.map((item, index) => (
                                  <Box pb='2'>
                                    <li key={index} >{item}</li>
                                  </Box>
                                ))}
                            </ul>
                          </Box>
                        </Box> : null
                      }
                    </Flex>

                  </Box>
                }
        
                {fetchPatientHistory?
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                  { fetchPatientHistory?.map((item, index) => (
                  <Card maxW="200" bg="gray.200" mt="10">
                    <Heading pt="2" textAlign="center" size='md'>{item.hospital}</Heading>
                    <CardBody>
                      <Text textAlign="center">{`Doctor: ${item.dName}`}</Text>
                      <Text textAlign="center">{`Date: ${new Date(item.createdAt).toLocaleDateString()}`}</Text>

                    </CardBody>
                    <Button colorScheme='teal' onClick={()=>handleClick(item.appointmentId)} >View more</Button>
                  </Card>
                  ))}
                </SimpleGrid>
                :null}
              </Box>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <>
      {isDrawerOpen && (
        <Drawer isOpen={isDrawerOpen} placement="left" onClose={fun} size="lg">
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader> Patient History</DrawerHeader>
              <DrawerBody>
                {/* Replace this with your UserProfile component */}
                <Box mt="20">
                <UserProfile patientHistory={patientHistory} />
                </Box>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      )}
    </>
      
    </>
  )
}

export default PatientProfile
