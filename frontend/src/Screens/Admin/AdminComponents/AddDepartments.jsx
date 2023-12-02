import React from 'react';
import { useAddDepartmentMutation } from '../../../slices/adminApiSlice';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import { toast } from "react-toastify";

function AddDepartments({refetch}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
 

  const [addDepartment, { isLoading }] = useAddDepartmentMutation();

  const functionHandler = async () => {
    try {
      const name = initialRef.current.value; // Fetch the value from the input
      console.log(name,'name')
      const res = await addDepartment({ name }).unwrap();
      console.log(res, 'chkkk responce');
      toast.success(res.success);
      refetch()
      toast.error(res.error);
      onClose();
    } catch (err) {

    }
  };

  return (
    <>
      <Button colorScheme='green' className='pl-10' onClick={onOpen}>
        Add Department
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Department</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input ref={initialRef} placeholder='Name' />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} className='align-top' onClick={functionHandler}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddDepartments;
