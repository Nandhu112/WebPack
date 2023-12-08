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


function DoctorViewPatient({_id}) {
  
        const { data: fetchPatientInfo,isLoading, refetch:patientRefetch } = useGetPatientInfoQuery({ _id})
        const { isOpen, onOpen, onClose } = useDisclosure();

        const recordHandle=()=>{
          console.log('chkkkk records')
        }
  return (
    <>
    <Button colorScheme='blue'  onClick={onOpen}>view Profile</Button>
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
              <Box bg="gray.200" borderRadius="md" p={2}>
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
            <Box bg="gray.200" borderRadius="md" p={4} mt={4}>
            { fetchPatientInfo && fetchPatientInfo.medicalConditions.length==0 && fetchPatientInfo.allergies.length==0 ?
               <Flex>
                <Text color="gray.600">
                  No medical records
                </Text>
                <Box ml="auto">
                <svg onClick={recordHandle} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </Box>
                </Flex>
               :      <Text color="gray.600">
               recods
             </Text> }
            </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  </>
  )
}

export default DoctorViewPatient
