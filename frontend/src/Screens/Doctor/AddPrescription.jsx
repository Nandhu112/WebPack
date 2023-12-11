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
    IconButton,
    FormControl,
    FormLabel,
    Textarea,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
 
} from '@chakra-ui/react';
import { FaUpload } from 'react-icons/fa';
import { RiDeleteBin2Fill } from "react-icons/ri";
// import { useAddRecordMutation, useDeleteRecordMutation } from "../../slices/doctorApiSlice"

function AddPrescription({ medication, setMedication, testReport, setTestReport, treatment,
    setTreatment, disease, setDisease, description, setDescription, modalClose }) {

    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [category, setCategory] = useState('medication')
    // const [addRecord, { isLoading }] = useAddRecordMutation();

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
        // const res = await addRecord({ record: inputValue, category, _id: fetchPatientInfo._id }).unwrap();
        patientRefetch()
        setInputValue("")

    }

    const [selectedTest, setSelectedTest] = useState('Sugar');
    const [result, setResult] = useState('');
    const [customTest, setCustomTest] = useState('');
    const [tests, setTests] = useState(['Sugar', 'Pressure', 'Cholesterol']);

    const handleTestChange = (event) => {
        const { value } = event.target;
        setSelectedTest(value);
    };

    const handleResultChange = (event) => {
        const { value } = event.target;
        setResult(value);
    };

    const AddPrescription=()=>{
        if(category==="medication"){
            setMedication([...medication,inputValue])
            setInputValue("")

        }
     if(category==="treatment"){
            setTreatment([...treatment,inputValue])
            setInputValue("")
        }
     if(category==="testReport"){
        setTestReport([...testReport,`${selectedTest} : ${result}`])
        setResult('')
     }
     if(category==="description"){
        console.log('dddd')
        setDescription(inputValue)
        setInputValue("")
     }

    }

    return (
        <>

            <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    {/* <ModalHeader textAlign="center" >Doctor Prescription</ModalHeader> */}
                    <ModalCloseButton />
                    <ModalBody>

                        <Select mt="16" ml="auto" maxW="150" mb="5" onChange={handleCategorys} defaultValue="Medications">
                            <option value="medication">Medications</option>
                            <option value="testReport">TestReports</option>
                            <option value="treatment">Treatments</option>
                            <option value="description">Description</option>
                        </Select>
                        {category === "description" ?
                            <Box>
                                <FormControl mt={4} >
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                    onChange={(e)=>setInputValue(e.target.value)} 
                                    value={inputValue}
                                     placeholder="Description" />
                                </FormControl>
                                <IconButton
                                    mt="5"
                                    ml="80"
                                    colorScheme="green"
                                    aria-label="Delete"
                                    icon={<FaUpload />}
                                    onClick={AddPrescription}
                                />
                            </Box>
                            :
                            <Box>
                                {category === "medication" &&
                                 medication && medication.map((item, index) => (
                                        <Box
                                            key={index} // Add a unique key for each mapped item
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
                                                <MedicarionPopup category={category} item={item} setMedication={setMedication} medication={medication} />
                                            </Flex>
                                        </Box>
                                    ))
                                }
                                {category === "treatment" &&
                                    treatment.map((item, index) => (
                                        <Box
                                            key={index} // Add a unique key for each mapped item
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
                                                <TreatmentPopup  item={item} setTreatment={setTreatment} treatment={treatment} />

                                            </Flex>
                                        </Box>
                                    ))
                                }
                                  {category === "testReport" &&
                                    testReport.map((item, index) => (
                                        <Box
                                            key={index} // Add a unique key for each mapped item
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
                                                <Box style={{ cursor: 'pointer' }}>
                                                <TestReportPopup  item={item} setTestReport={setTestReport} testReport={testReport} />
                                                </Box>
                                            </Flex>
                                        </Box>
                                    ))
                                }

                                {category === "testReport" ?
                                    <Box>
                                        <InputGroup borderColor="gray.300" borderWidth="1px" borderRadius="md" p={2}>
                                            <Flex >
                                                <Flex align="center" w="100%">
                                                    <FormControl flex="1" mr={4}>
                                                        <Select value={selectedTest} onChange={handleTestChange}>
                                                            {tests.map((test, index) => (
                                                                <option key={index} value={test}>
                                                                    {test}
                                                                </option>
                                                            ))}
                                                        </Select>
                                                    </FormControl>

                                                    <FormControl flex="1">
                                                        <Input maxW="40"
                                                            placeholder="Enter result"
                                                            value={result}
                                                            onChange={handleResultChange}
                                                        />
                                                    </FormControl>
                                                    <InputRightElement mt="2" mr="2">
                                                    <IconButton
                                                        colorScheme="green"
                                                        aria-label="Upload"
                                                        icon={<FaUpload />}
                                                        onClick={AddPrescription}
                                                    />
                                                </InputRightElement>
                                                </Flex>

                                             
                                            </Flex>
                                        </InputGroup>
                                    </Box>
                                    :
                                    <InputGroup >
                                        <Input
                                            onChange={((e) => setInputValue(e.target.value))}
                                            placeholder={`Enter ${category}`}
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
                                                onClick={AddPrescription}
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                }
                            </Box>
                        }
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

export default AddPrescription

const MedicarionPopup = ({
    item,
    setMedication,
    medication}) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleConfirm = async () => {
        const newData = medication.filter((items) => items !== item);
        setMedication(newData)
        setIsOpen(false)
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

const TreatmentPopup = ({setTreatment,
    treatment,
    item,
     }) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleConfirm = async () => {
        const newData = treatment.filter((items) => items !== item);
        setTreatment(newData)
        setIsOpen(false)
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

const TestReportPopup = ({setTestReport,
    testReport,
    item,
     }) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleConfirm = async () => {
        const newData = testReport.filter((items) => items !== item);
        setTestReport(newData)
        setIsOpen(false)
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

