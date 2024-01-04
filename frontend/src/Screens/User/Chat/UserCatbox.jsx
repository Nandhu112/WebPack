import { Flex, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Button, Box } from '@chakra-ui/react';
import UserMsg from './UserMsg';
import UserChat from './UserChat';
import React,{useState} from 'react';

function UserCatbox({hospitalId}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [messageOpen, setMessageOpen] = useState(false)

  const messageBoxClose=()=>{
    setMessageOpen(false)
  }

  return (
    <Flex >
      <Button colorScheme='blue' onClick={onOpen}>Enquiry</Button>
      
      <Drawer isOpen={isOpen} placement="right" onClose={() => {onClose(); messageBoxClose();}} size={!messageOpen ? 'sm' : "xl"}> <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody >
            <Box maxH="700">
              <UserChat hospitalId={hospitalId} messageOpen={messageOpen} setMessageOpen={setMessageOpen} />
              </Box>
              {/* You might place UserMsg or any other content here */}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
  );
}

export default UserCatbox;
