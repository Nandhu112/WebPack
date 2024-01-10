import { useState, useEffect } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input, InputGroup,
    InputRightElement,
    Flex,
    Box,
    Select,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    IconButton
} from '@chakra-ui/react';
import { FaUpload } from 'react-icons/fa';
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useAddRecordMutation, useDeleteRecordMutation } from "../../slices/doctorApiSlice"

export default function DoctorAddRecords({ modalClose, fetchPatientInfo, patientRefetch }) {


    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [category, setCategory] = useState('ailments')
    const [addRecord, { isLoading }] = useAddRecordMutation();

    useEffect(() => {
        // Open the modal when the component mounts
        setIsOpen(true);
    }, []);

    const handleClose = () => {
        modalClose()
        setInputValue(''); // Reset input value on modal close
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);

    };

    const handleCategorys = (e) => {
        setCategory(e.target.value)

    }

    const addRecordHandler = async () => {
        const res = await addRecord({ record: inputValue, category, _id: fetchPatientInfo?._id }).unwrap();
        patientRefetch()
        setInputValue("")

    }


    return (
        <>

            <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center" >Update Records</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Select ml="auto" maxW="210" mb="5" onChange={handleCategorys} defaultValue="ailments">
                            <option value="ailments">Enduring health issues</option>
                            <option value="allergies">Allergy</option>
                        </Select>
                        {category === "ailments" ? (
                            fetchPatientInfo.ailments && fetchPatientInfo.ailments.map((item, index) => (
                                <Box
                                    key={index}
                                    mb='5'
                                    borderWidth="1px"
                                    borderRadius="md"
                                    borderColor="gray.200"

                                    width="400px"
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Flex flex="1" justifyContent="space-between" alignItems="center">
                                        <Box pl='4' flex="1" textAlign="left">
                                            {item}
                                        </Box>
                                        <Box style={{ cursor: 'pointer' }} >
                                            <TestPopup item={item} category={category} _id={fetchPatientInfo?._id} patientRefetch={patientRefetch} />
                                        </Box>
                                    </Flex>
                                </Box>
                            ))
                        ) : category === "allergies" ? (
                            fetchPatientInfo.allergies && fetchPatientInfo.allergies.map((item, index) => (
                                <Box
                                    key={index}
                                    mb='5'
                                    borderWidth="1px"
                                    borderRadius="md"
                                    borderColor="gray.200"

                                    width="400px"
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Flex flex="1" justifyContent="space-between" alignItems="center">
                                        <Box pl='4' flex="1" textAlign="left">
                                            {item}
                                        </Box>
                                        <Box style={{ cursor: 'pointer' }} >
                                            <TestPopup item={item} category={category} _id={fetchPatientInfo?._id} patientRefetch={patientRefetch} />
                                        </Box>
                                    </Flex>
                                </Box>
                            ))
                        ) : null}

                        <InputGroup >
                            <Input
                                onChange={((e) => setInputValue(e.target.value))}
                                placeholder={`Enter ${category}...`}
                                value={inputValue}
                            />
                            <InputRightElement>
                                {/* <Box style={{ cursor: 'pointer' }} onClick={addRecordHandler}>
                                    <FaUpload />
                                </Box> */}
                                <IconButton
                                    
                                    colorScheme="green"
                                    aria-label="Delete"
                                    icon={<FaUpload />}
                                    onClick={addRecordHandler}
                                />
                            </InputRightElement>
                        </InputGroup>

                    </ModalBody>

                    <ModalFooter>

                        <Button variant="ghost" onClick={handleClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}


const TestPopup = ({ item, category, _id, patientRefetch }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [deleteRecord, { isLoading }] = useDeleteRecordMutation();

    const handleConfirm = async () => {
        console.log(item, category, _id, 'chkk handleConfirm ')
        const res = await deleteRecord({ record: item, category, _id }).unwrap();
        patientRefetch()
    };

    return (
        <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <PopoverTrigger>
                <IconButton
                    colorScheme="red"
                    aria-label="Delete"
                    icon={<RiDeleteBin2Fill />}
                    onClick={() => setIsOpen(true)}
                />
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Are you sure?</PopoverHeader>
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
