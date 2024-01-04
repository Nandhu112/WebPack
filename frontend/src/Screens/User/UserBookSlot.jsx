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
    FormControl,
    FormLabel,
    Input,
    Select,
    HStack,
    VStack,
    Box,
    Center,
    extendTheme,
    FormErrorMessage
} from '@chakra-ui/react';

import { useToast } from '@chakra-ui/react'
import { useSelector } from "react-redux";
import { useListAllMembersQuery } from "../../slices/userApiSlice.js"
import { useUsermakeAppointmentMutation, useShowDoctorAppointmentMutation } from "../../slices/userApiSlice"
import Payment from './Payment.jsx';

const UserBookSlot = ({ item }) => {
    const { userInfo } = useSelector((state) => state.auth)
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [date, setDate] = useState('');
    const [time, setTime] = useState('')
    const [selectedSlot, setSelectedSlot] = useState('');
    const [check, setcheck] = useState()
    const [patient, setPatient] = useState()
    const [consultation, setConsultation] = useState()
    const [errors, setErrors] = useState({});
    const [pamentComponent, setPamentComponent] = useState(false)

    const [makeAppointment] = useUsermakeAppointmentMutation();
    const [showAppointment] = useShowDoctorAppointmentMutation();

    const { data: members, isLoading, refetch } = useListAllMembersQuery({ _id: userInfo._id })

    const validateFields = () => {
        const newErrors = {};
        if (!patient) newErrors.name = 'Select a patient';
        if (!consultation) newErrors.consultation = 'Select a method';
        // if (!time) newErrors.gender = 'Time is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };





    useEffect(() => {
        // Get current date in 'YYYY-MM-DD' format
        const today = new Date().toISOString().split('T')[0];
        setDate(today); // Set current date as initial value
    }, []);


    useEffect(() => {
        forDate();
    }, []);

    const handlePatient = (e) => {
        setPatient(e.target.value)
        console.log(patient, 'patient')
    }
    const handleConsultation = (e) => {
        console.log(e.target.value)
        setConsultation(e.target.value)
    }

    const forDate = async () => {
        try {
            let outDate
            const today = new Date().toISOString().split('T')[0];
            if (!date) {
                outDate = today
            }
            else {
                outDate = today
            }
            console.log(today, "time")
            const res = await showAppointment({ date: outDate, _id: item._id }); // Assuming `time` is defined
            setcheck(res)
            console.log(check, 'appointments');
        } catch (error) {
            console.error(error); // Log the error for debugging purposes
        }
    }

    const forDate2 = async (event) => {
        await setDate(event.target.value)
        const res = await showAppointment({ date: event.target.value, _id: item._id }); // Assuming `time` is defined
        setcheck(res)
        console.log(check, 'appointmentsss');
    }


    // Logic to represent time slots
    const morningSlots = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM'];
    const afternoonSlots = ['2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'];

    const handleSlotClick = (time) => {
        // Handle slot click event here
        console.log(`Slot time: ${time}`);
        setTime(time)
        console.log(`Slot date: ${date}`)
        // Reset previous selected slot styles
        setSelectedSlot('');
        // Set new selected slot
        setSelectedSlot(time);

    };

    const toast = useToast()

    const handleSubmit = async () => {

        const isValid = validateFields();

        if (isValid) {
            console.log(item, "chk handleSubmit");
            const slot = [date, time]
            const res = await makeAppointment({ slot, dId: item._id, pId: patient, method: consultation,
                 hospital: item.hospitalId, department: item.departmentId,user:userInfo._id }).unwrap();
            console.log(res, 'res')
            toast({
                title: 'Appointment Booked.',
                description: res.success,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            handleClose()

        }
    }
    const paymentHandler=async()=>{
         const validateField = await validateFields()
         if(validateField){
            setPamentComponent(true)
         }
    }
    return (
        <>
            <Button mt='5' mb='5' colorScheme='blue' marginLeft="auto" onClick={handleOpen} >Book Appointment</Button>

            <Modal isOpen={isOpen} onClose={handleClose} size="2xl"> {/* Adjusting the modal size to 'xl' for increased width */}
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader >Book an Appointment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Select Date</FormLabel>
                            <Input
                                value={date}
                                onChange={(event) => forDate2(event)}
                                placeholder="Select Date"
                                size="md"
                                type="date"
                            />
                        </FormControl>

                        {/* Calendar to select date */}
                        <FormControl pt="5" isInvalid={!!errors.name}>
                            <FormLabel>Patient Name</FormLabel>
                            <Select placeholder="Select patient" onChange={handlePatient} >
                                {/* Populate with doctor names */}
                                {members && members.map((item, index) =>
                                    <option value={item._id}>{item.name}</option>
                                )}
                                {/* Add more doctors */}
                            </Select>
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                        </FormControl>

                        <FormControl pt="5" mb='10' isInvalid={!!errors.consultation}>
                            <FormLabel>Consultation type</FormLabel>
                            <Select placeholder="Select method" onChange={handleConsultation} >
                                <option value="offline">Offline consultation </option>
                                <option value='online'>Online consultation</option>

                                {/* Add more doctors */}
                            </Select>
                            <FormErrorMessage>{errors.consultation}</FormErrorMessage>
                        </FormControl>

                        {/* Time slots */}
                        <VStack mt={4} spacing={4}>

                            <HStack>

                                {check?.data &&
                                    morningSlots.map((slot, index) => (
                                        <Box
                                            key={index}
                                            borderWidth="1px"
                                            borderColor={selectedSlot === slot || check?.data.find((item) => item == slot) ? 'red' : 'green'}
                                            // borderColor={selectedSlot === slot  ? 'red' : 'green'}
                                            p={2}
                                            color={selectedSlot === slot || check?.data.find((item) => item == slot) ? 'red' : 'green'}
                                            // color={selectedSlot === slot  ? 'red' : 'green'}
                                            cursor="pointer"
                                            onClick={() => handleSlotClick(slot)}
                                        >
                                            {slot}
                                        </Box>
                                    ))
                                }

                            </HStack>
                            <HStack>
                                {check?.data &&
                                    afternoonSlots.map((slot, index) => (
                                        <Box
                                            key={index}
                                            borderWidth="1px"
                                            borderColor={selectedSlot === slot || check?.data.find((item) => item == slot) ? 'red' : 'green'}
                                            // borderColor={selectedSlot === slot  ? 'red' : 'green'}
                                            p={2}
                                            color={selectedSlot === slot || check?.data.find((item) => item == slot) ? 'red' : 'green'}
                                            // color={selectedSlot === slot  ? 'red' : 'green'}
                                            cursor="pointer"
                                            onClick={() => handleSlotClick(slot)}
                                        >
                                            {slot}
                                        </Box>
                                    ))}
                            </HStack>
                        </VStack>
                    </ModalBody>
                    <Box mt="5">
                        {pamentComponent?<Payment handleSubmit={handleSubmit} />:null}
                    </Box>
                    <ModalFooter>

                       {pamentComponent?null :<Button colorScheme="blue" mr={3} onClick={handleClose}>
                            Close
                        </Button>}
                      {pamentComponent? <Button colorScheme="blue" mr={3} onClick={()=>setPamentComponent(false)} >
                            cancel
                        </Button>:null}
                        {/* <Button onClick={handleSubmit} colorScheme="green">Book</Button> */}
                      {pamentComponent?null :  <Button onClick={()=>paymentHandler()} colorScheme="green">Book</Button>}

                    </ModalFooter>
                </ModalContent>


            </Modal>
        </>
    );
};

export default UserBookSlot;

