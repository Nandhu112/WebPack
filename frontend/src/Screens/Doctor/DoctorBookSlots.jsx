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
    FormErrorMessage,
    Flex
} from '@chakra-ui/react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react'
import { useSelector } from "react-redux";
// import { useUsermakeAppointmentMutation, useShowDoctorAppointmentMutation } from "../../slices/userApiSlice"
import { useShowDoctorAppointmentMutation } from "../../slices/userApiSlice"

function DoctorBookSlots() {
    const [isOpen, setIsOpen] = useState(false);
    // const [selectedDate, setSelectedDate] = useState(new Date());
    const [date, setDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
    const [check, setcheck] = useState()
    const [patient,setPatient]=useState()
    const [selectTime, setSelectTime] = useState('')
    const [slots, setSlots] = useState([])
    const { doctorInfo } = useSelector((state) => state.doctorAuth)
   

    // const [makeAppointment] = useUsermakeAppointmentMutation();
    const [showAppointment] = useShowDoctorAppointmentMutation();

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };


    useEffect(() => {
        // Get current date in 'YYYY-MM-DD' format
        const today = new Date().toISOString().split('T')[0];
        setDate(today); // Set current date as initial value
    }, []);


    useEffect(() => {
        forDate();
    }, []);


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
            const res = await showAppointment({ date: outDate,_id:doctorInfo._id  }); // Assuming `time` is defined
            setcheck(res)
            console.log(check, 'appointments');
        } catch (error) {
            console.error(error); // Log the error for debugging purposes
        }
    }

    const forDate2 = async (event) => {
        await setDate(event.target.value)
        const res = await showAppointment({ date: event.target.value,_id:doctorInfo._id }); // Assuming `time` is defined
        setcheck(res)
        console.log(check, 'appointmentsss');
    }


    // Logic to represent time slots
    const morningSlots = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM'];
    const afternoonSlots = ['2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'];

    const handleSlotClick = (time) => {
        let updatedSlots = [...slots]; // Create a copy of slots
      
        const index = updatedSlots.indexOf(time);
      
        if (index !== -1) {
          // If time is already in slots, remove it
          updatedSlots.splice(index, 1);
        } else {
          // If time is not in slots, add it
          updatedSlots = [...updatedSlots, time];
        }
      
        setSelectedSlot('');
        setSlots(updatedSlots);
      };

    const toast = useToast()

    const handleShedule=(e)=>{
        setSelectTime(e.target.value)
        if(e.target.value==='fullDay'){
            if(check.data.length!==0){
                toast({
                    title: 'You can not block out this day',                   
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
            else{
                setSlots(['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM','2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'])
            }
             
        }
        if(e.target.value==='morning'){
            const commonElementsExist = morningSlots.some(elem =>check.data.includes(elem))
            console.log(commonElementsExist,'commonElementsExist')
            if(!commonElementsExist){
                setSlots(morningSlots)
            }
            else{
                toast({
                    title: 'You can not block out this day',                   
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
             
        }
        if(e.target.value==='afternoon'){
            const commonElementsExist = afternoonSlots.some(elem =>check.data.includes(elem))
            console.log(commonElementsExist,'commonElementsExist')
            if(!commonElementsExist){
           
                setSlots(afternoonSlots)
            }
            else{
                toast({
                    title: 'You can not block out this day',                   
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
        }           
    }

    const handleSubmit = async () =>{
            console.log("chk handleSubmit");
    
            try {
                axios.post('/api/doctors/blockSlot', {
                    Bslot:slots,
                    dId:doctorInfo._id ,
                    date:date
                  
               }).then(res=>{
                toast({
                    title: 'Slot Blocked successfully',
                    description: res.success,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                handleClose()

               })
              
             } catch (error) {
               console.error('Error sending data to the backend', error);
             }
 
    }
  return (
    <>

    <Button colorScheme='blue' marginLeft="auto" onClick={handleOpen} >Book Appointment</Button>

    <Modal isOpen={isOpen} onClose={handleClose} size="2xl"> {/* Adjusting the modal size to 'xl' for increased width */}
        <ModalOverlay />
        <ModalContent>
            
            <ModalHeader textAlign="center" mt="10" mb="5">Block Slots</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Flex mb="20">
                <FormControl maxW="40">
                    <Input 
                        value={date}
                        onChange={(event) =>{ forDate2(event),setSelectTime(''),setSlots([])}}
                        placeholder="Select Date"
                        type="date"
                    />
                </FormControl>

                <Select ml="auto" maxW="150"  onChange={handleShedule} value={selectTime}
                        placeholder='select slot'>
                            <option value="fullDay">Full day</option>
                            <option value="morning">Morning</option>
                            <option value="afternoon">Afternoon</option>
                </Select>
                </Flex>


                {/* Time slots */}
                <VStack mt={4} spacing={4}>

                    <HStack>
                        
                            { check?.data &&
                            morningSlots.map((slot, index) => (
                                <Box
                                    key={index}
                                    borderWidth="1px"
                                    borderColor={
                                       
                                        (check?.data && check.data.find((item) => item === slot)) || 
                                        slots.includes(slot)
                                          ? 'red'
                                          : 'green'
                                      }
                                    // borderColor={selectedSlot === slot  ? 'red' : 'green'}
                                    p={2}
                                    color={ (check?.data.find((item)=> item===slot))|| slots.includes(slot) ? 'red' : 'green'}
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
                                borderColor={
                                   
                                    (check?.data && check.data.find((item) => item === slot)) ||  slots.includes(slot) ? 'red' : 'green'
                                  }
                                // borderColor={selectedSlot === slot  ? 'red' : 'green'}
                                p={2}
                                color={ (check?.data.find((item)=> item===slot))|| slots.includes(slot) ? 'red' : 'green'}
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

            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleClose}>
                    Close
                </Button>
                <Button onClick={handleSubmit} colorScheme="green">Block</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
</>
  )
}

export default DoctorBookSlots
