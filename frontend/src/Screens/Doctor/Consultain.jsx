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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  IconButton
} from '@chakra-ui/react';
import { useGetPatientInfoQuery } from "../../slices/doctorApiSlice"
import DoctorAddRecords from './DoctorAddRecords';
import { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import DoctorViewPatient from './DoctorViewPatient';
import AddPrescription from './AddPrescription';
import { useGetDoctorInfoQuery,useGetAppointmentStatusQuery } from "../../slices/doctorApiSlice"
import { useSelector } from "react-redux";
import axios from 'axios';


function Consultain({ _id,appointmentId,refetchAppointment }) {
  const { doctorInfo } = useSelector((state) => state.doctorAuth)
  const { data: fetchDoctorInfo, refetch } = useGetDoctorInfoQuery({ id: doctorInfo._id })
  const { data: fetchPatientInfo, isLoading, refetch: patientRefetch } = useGetPatientInfoQuery({ _id })
  const { data: appointmentDetails, refetch: refetchAppointmentDetails } = useGetAppointmentStatusQuery({appointmentId:appointmentId })
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalOpen, setModalOpen] = useState(false)
  const [medication, setMedication] = useState([])
  const [testReport, setTestReport] = useState([])
  const [treatment, setTreatment] = useState([])
  const [disease, setDisease] = useState("")
  const [description, setDescription] = useState("")  

  
  const recordHandle = () => {
    setModalOpen(true)
  }
  const modalClose = () => {
    setModalOpen(false)
  }

  const confirmHandler=()=>{
    console.log(fetchPatientInfo,"fetchPatientInfo")
    try {
      axios.post('/api/doctors/addtoHistory', {
        doctor:fetchDoctorInfo,
        patient:fetchPatientInfo,
        testResults:testReport,
        medicationList:medication,
        treatments:treatment,
        description:description,
        appointmentId:appointmentId
        
     });
     onClose()
     refetchAppointmentDetails()
     refetchAppointment()
     console.log('Data sent successfully');
   } catch (error) {
     console.error('Error sending data to the backend', error);
   }
  }
  return (
    <>
      <Button colorScheme='blue' onClick={onOpen}>view </Button>
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
                      <strong></strong>{fetchPatientInfo?.dateOfBirth}
                    </Text>
                    <DoctorViewPatient _id={_id} />
                  </VStack>
                </Box>
              </Grid>

              {/* Details */}
              <Box bg="blue.100" borderRadius="md" p={4} mt={4} minH="390">
             { !appointmentDetails?.length==0 ?
              <Box>
                {!appointmentDetails[0].medicationList.length==0?
                  <Box >
                    <Text fontSize="md" fontWeight="bold" mb="3">
                      Medication
                    </Text>
                    <Box bg="gray.200" p="3" mb="3" borderRadius="md" pb='5' pt="5">
                      <ul>
                        <Box pb='2'>
                        {appointmentDetails[0].medicationList.map((item, index) => (
                          <li pb='2' >{item}</li>
                        ))}
                        </Box>
                      </ul>
                    </Box>
                  </Box>
                  : null}
                   {!appointmentDetails[0].testResults.length==0?
                    <Box >
                      <Text fontSize="md" fontWeight="bold" mb="3">
                        Test Report
                      </Text>
                      <Box bg="gray.200" p="3" mb="3" borderRadius="md" pb='5' pt="5">
                        <ul>
                          <Box pb='2'>
                          {appointmentDetails[0].testResults.map((item, index) => (
                            <li pb='2'>{item}</li>
                          ))}
                          </Box>
                        </ul>
                      </Box>
                    </Box>
                    : null}
                     {!appointmentDetails[0].treatments.length==0 ?
                    <Box >
                      <Text fontSize="md" fontWeight="bold" mb="3">
                      Treatment
                      </Text>
                      <Box bg="gray.200" p="3" mb="3" borderRadius="md" pb='5' pt="5">
                        <ul>
                          <Box pb='2'>
                          {appointmentDetails[0].treatments.map((item, index) => (
                            <li pb='2'>{item}</li>
                          ))}
                          </Box>
                        </ul>
                      </Box>
                    </Box>
                    : null}
                     {appointmentDetails[0].description ?
                    <Box >
                      <Text fontSize="md" fontWeight="bold" mb="3">
                      Description
                      </Text>
                      <Box bg="gray.200" p="3" mb="3" borderRadius="md" pb='5' pt="5">
                          <Box pb='2'>
                           <text>{appointmentDetails[0].description}</text>
                          </Box>      
                      </Box>
                    </Box>
                    : null}
                </Box>           
             : null                        }
                {appointmentDetails?.length==0 && medication.length === 0 && testReport.length === 0 && treatment.length === 0 && description == "" ?
                
                  <Flex>
                    <Text color="gray.600">
                      No prescriptions yet
                    </Text>
                    <Box ml="auto" style={{ cursor: 'pointer' }} onClick={recordHandle}>
                      <FaPlus />
                    </Box>
                  </Flex>
                  :
                  <Box>
                    { appointmentDetails?.length==0 && !medication.length == 0 ?
                    <Box >
                      <Text fontSize="md" fontWeight="bold" mb="3">
                        Medication
                      </Text>
                      <Box bg="gray.200" p="3" mb="3" borderRadius="md" pb='5' pt="5">
                        <ul>
                          <Box pb='2'>
                          {medication.map((item, index) => (
                            <li pb='2' >{item}</li>
                          ))}
                          </Box>
                        </ul>
                      </Box>
                    </Box>
                    : null}
                     {  appointmentDetails?.length==0 && !testReport.length == 0 ?
                    <Box >
                      <Text fontSize="md" fontWeight="bold" mb="3">
                        Test Report
                      </Text>
                      <Box bg="gray.200" p="3" mb="3" borderRadius="md" pb='5' pt="5">
                        <ul>
                          <Box pb='2'>
                          {testReport.map((item, index) => (
                            <li pb='2'>{item}</li>
                          ))}
                          </Box>
                        </ul>
                      </Box>
                    </Box>
                    : null}
                   { appointmentDetails?.length==0 && !treatment.length == 0 ?
                    <Box >
                      <Text fontSize="md" fontWeight="bold" mb="3">
                      Treatment
                      </Text>
                      <Box bg="gray.200" p="3" mb="3" borderRadius="md" pb='5' pt="5">
                        <ul>
                          <Box pb='2'>
                          {treatment.map((item, index) => (
                            <li pb='2'>{item}</li>
                          ))}
                          </Box>
                        </ul>
                      </Box>
                    </Box>
                    : null}
                   { appointmentDetails?.length==0 && !description.length == 0 ?
                    <Box >
                      <Text fontSize="md" fontWeight="bold" mb="3">
                      Description
                      </Text>
                      <Box bg="gray.200" p="3" mb="3" borderRadius="md" pb='5' pt="5">
                          <Box pb='2'>
                           <text>{description}</text>
                          </Box>      
                      </Box>
                    </Box>
                    : null}
                    {appointmentDetails?.length==0?
                    <Flex mt="10" justifyContent={'space-between'}>
                    <Button  onClick={recordHandle} minW="20" colorScheme="blue">Edit</Button>
                    <TestPopup confirmHandler={confirmHandler}/>
                    </Flex>
                       :null }
                  </Box>
                }
              </Box>


              {
                modalOpen ? <AddPrescription medication={medication} setMedication={setMedication} testReport={testReport}
                  setTestReport={setTestReport} treatment={treatment} setTreatment={setTreatment} disease={disease} setDisease={setDisease}
                  description={description} setDescription={setDescription} modalClose={modalClose}
                  fetchPatientInfo={fetchPatientInfo ? fetchPatientInfo : null}
                  patientRefetch={patientRefetch} /> : null
              }
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default Consultain


const TestPopup = ({confirmHandler }) => {

  const [isOpen, setIsOpen] = useState(false);
  const handleConfirm = async () => {
    confirmHandler()

  };

  return (
      <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <PopoverTrigger>
          <Button  onClick={() => setIsOpen(true)} colorScheme='green'>Update</Button>
          </PopoverTrigger>
          <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader p='4'>You cannot make changes after  updating </PopoverHeader>
              <PopoverBody>
                  <Button colorScheme="red" mr={2} onClick={handleConfirm}>
                      Yes
                  </Button>
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                      No
                  </Button>
              </PopoverBody>
          </PopoverContent>
      </Popover>
  );
};




