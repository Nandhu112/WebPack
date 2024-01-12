import React, { useState } from 'react';
import { ChakraProvider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Flex, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function SwitchModal({setOpenModa}) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);

    // Function to handle modal close
    const handleClose = () => {   
        setOpenModa(false)
    };
    const hospitalHandler =()=>{
        navigate(`/hospital`);
        setOpenModa(false)
    }
    const doctorHandler =()=>{
        navigate(`/doctor`);
        setOpenModa(false)
    }

  return (
    <ChakraProvider>
    {/* Modal component */}
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent>
    
        <ModalHeader pl="40">Select Your Role</ModalHeader>

        <ModalCloseButton />
        <ModalBody>
            <Center>
            <Flex>
        <Button minW="150" colorScheme="blue" mr={3} onClick={hospitalHandler}>
            Hospital
          </Button>
          <Button minW="150" colorScheme="blue" mr={3} onClick={doctorHandler}>
            Doctor
          </Button>
          </Flex>
          </Center>
        </ModalBody>
        <ModalFooter>
          {/* First button */}

          {/* Second button */}
   
        </ModalFooter>
      </ModalContent>
    </Modal>
  </ChakraProvider>
  )
}

export default SwitchModal
