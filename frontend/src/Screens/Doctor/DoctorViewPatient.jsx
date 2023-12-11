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
  Flex,
} from '@chakra-ui/react';
import { useGetPatientInfoQuery } from "../../slices/doctorApiSlice"
import DoctorAddRecords from './DoctorAddRecords';
import { useState } from 'react';
import { FaPlus } from "react-icons/fa";

function DoctorViewPatient({ _id }) {

  const { data: fetchPatientInfo, isLoading, refetch: patientRefetch } = useGetPatientInfoQuery({ _id })
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalOpen, setModalOpen] = useState(false)

  const recordHandle = () => {
    setModalOpen(true)
  }
  const modalClose = () => {
    setModalOpen(false)
  }

  return (
    <>
      <Button colorScheme='blue' onClick={onOpen}>view Profile</Button>
      <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="sm">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Patient Profile</DrawerHeader>
            <DrawerBody>
              <Grid templateColumns="1fr 2fr" gap={8}>
                {/* Avatar */}
                <Box bg="blue.200" borderRadius="md" p={2} display="grid" justifyContent="center" alignItems="center">
                  <Avatar size="2xl" name={fetchPatientInfo?.name} src={fetchPatientInfo?.profileImage} />
                </Box>

                {/* Personal Data */}
                <Box bg="blue.100" borderRadius="md" p={2}>
                  <VStack align="flex-start" spacing={2} color="gray.600">
                    {/* <Heading size="md">{name}</Heading> */}
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
                    <Box ml="auto" style={{ cursor: 'pointer' }} onClick={recordHandle}>
                      <FaPlus />
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
                                  <li  key={index} >{item}</li>
                                  </Box>
                                ))}
                            </ul>
                          </Box>
                        </Box> : null
                      }
                    </Flex>
                    <Flex justifyContent="flex-end" mt="10">
                      <Button onClick={recordHandle} colorScheme="blue">Update</Button>
                    </Flex>
                  </Box>
                }
              </Box>
              {
                modalOpen ? <DoctorAddRecords modalClose={modalClose} fetchPatientInfo={fetchPatientInfo?fetchPatientInfo:null} 
                patientRefetch={patientRefetch} /> : null
              }
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default DoctorViewPatient
