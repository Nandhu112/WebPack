import { useState } from 'react';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from '@chakra-ui/react';

const TestPopup = ({ onConfirm, message }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <PopoverTrigger>
        <Button onClick={() => setIsOpen(true)}>Open Confirmation</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Confirmation</PopoverHeader>
        <PopoverBody>
          <p>{message}</p>
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

export default TestPopup;