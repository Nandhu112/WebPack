import { useState, useEffect } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Flex, Icon, Center } from "@chakra-ui/react";
import { MdBlock } from "react-icons/md";         

function BlockedModal() {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
      setIsOpen(true);
    }, []);
  
  return (
      <>
       <Modal isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent borderRadius="8px" bg="red.500">
        <ModalHeader textAlign="center" color="white">
          <Center>
            <Flex align="center">
              <Icon as={MdBlock} mr="2" boxSize={6} />
              User Blocked
            </Flex>
          </Center>
        </ModalHeader>
        <ModalBody color="white" textAlign="center" pb="7">
          <p p="5">Sorry, you have been blocked by the admin. Please contact the admin for further information.</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  </>
  )
}

export default BlockedModal
