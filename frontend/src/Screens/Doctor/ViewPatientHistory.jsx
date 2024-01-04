import { useState } from 'react';
import {
  Box,
  Grid,
  Avatar,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

function ViewPatientHistory({ fetchDoctorInfo, refetch, VerificationDoctor, handleRoom }) {
    const [name, setName] = useState('');
    const [roomId, setRoomId] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(true);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box minHeight="100vh" p={4} display="flex" justifyContent="center" alignItems="center">
    {/* Modal */}
    <Modal isOpen={isModalOpen} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Doctor Profile</ModalHeader>
        <ModalCloseButton onClick={() => setIsModalOpen(false)} />
        <ModalBody>
            {/* Content of the modal */}
            <Box p={4} maxW="600px" bg="white" borderRadius="lg" boxShadow="md">
              <Grid templateColumns="1fr 2fr" gap={8}>
                {/* Avatar */}
                <Box bg="blue.200" borderRadius="md" p={2} display="grid" justifyContent="center" alignItems="center">
                  <Avatar size="2xl" name={fetchDoctorInfo?.name} src={fetchDoctorInfo?.profileImage} />
                  {/* UpdateImageDoctor component */}
                  {/* Assuming UpdateImageDoctor is a component to update the doctor's image */}
                  {/* <UpdateImageDoctor refetch={refetch} /> */}
                </Box>

                {/* Personal Data */}
                <Box bg="gray.200" borderRadius="md" p={2}>
                  <VStack align="flex-start" spacing={2} color="gray.600">
                    <Heading size="md">{fetchDoctorInfo?.name}</Heading>
                    <Text>
                      <strong>Title:</strong> sss
                    </Text>
                    <Text>
                      <strong>Department:</strong> ttt
                    </Text>
                    <Text>
                      <strong>Qualification:</strong> fff
                    </Text>
                  
                  </VStack>
                </Box>
              </Grid>

              {/* Details */}
              <Box bg="gray.200" borderRadius="md" p={4} mt={4}>
                <VStack align="flex-start" spacing={2}>
                  <Text color="gray.600">
                    <strong>About:</strong>nnnn
                  </Text>
                  {/* Add more details as needed */}
                </VStack>
              </Box>

        
            </Box>
          </ModalBody>
        <ModalFooter>
          {/* Button to close the modal */}
          <Button colorScheme="red" mr={3} onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
          {/* Additional buttons or actions */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  </Box>
  );
}

export default ViewPatientHistory;
