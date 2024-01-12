import React, { useState } from 'react';
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
    Select,
    FormErrorMessage
} from '@chakra-ui/react';
import { toast } from "react-toastify";
import {useAddNewMemberMutation} from "../../slices/userApiSlice"
import { useSelector } from "react-redux";

function AddNewMember({refetch,isOpen, onOpen, onClose}) {
    const { userInfo } = useSelector((state) => state.auth)
    const [addMember]= useAddNewMemberMutation()
    const _id=userInfo._id
    // const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [gender, setGender] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async () => {
        console.log("chkk id")
        const isValid = validateFields();
    
        if (isValid) {
            console.log(userInfo,"chkk id")
            try {
                const response = await addMember({ name, date, bloodGroup, gender, _id:userInfo._id });
                console.log(response,"response")
                toast.success(response.data.message);
                refetch()
                onClose(); // Close the modal after successful submission
            } catch (error) {
                console.error("Error while submitting:", error);
                // Display an error toast or take appropriate action
                toast.error("An error occurred while submitting.");
            }
        }
    };

    const validateFields = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Name is required';
        if (!date) newErrors.date = 'Date of birth is required';
        if (!bloodGroup) newErrors.bloodGroup = 'Blood Group is required';
        if (!gender) newErrors.gender = 'Gender is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <>
            <Button colorScheme='green' className='pl-10' onClick={onOpen} m="10">
            Add New Member
            </Button>

            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New Member</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl pt="5" isInvalid={!!errors.name}>
                            <FormLabel>Name</FormLabel>
                            <Input
                                onChange={(e) => setName(e.target.value)}
                                ref={initialRef}
                                placeholder='Name'
                            />
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                        </FormControl>
                        <FormControl pt="5" isInvalid={!!errors.gender}>
                            <FormLabel>Gender</FormLabel>
                            <Select
                                onChange={(event) => setGender(event.target.value)}
                                placeholder='Select option'
                            >
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </Select>
                            <FormErrorMessage>{errors.gender}</FormErrorMessage>
                        </FormControl>
                        <FormControl pt="5" isInvalid={!!errors.date}>
                            <FormLabel>Date of birth</FormLabel>
                            <Input
                                onChange={(event) => setDate(event.target.value)}
                                placeholder="Select Date and Time"
                                size="md"
                                type="datetime-local"
                            />
                            <FormErrorMessage>{errors.date}</FormErrorMessage>
                        </FormControl>
                        <FormControl pt="5" isInvalid={!!errors.bloodGroup}>
                            <FormLabel>Blood Group</FormLabel>
                            <Input
                                onChange={(e) => setBloodGroup(e.target.value)}
                                placeholder='Blood Group'
                            />
                            <FormErrorMessage>{errors.bloodGroup}</FormErrorMessage>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} className='align-top' onClick={handleSubmit}>
                            Confirm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddNewMember;
