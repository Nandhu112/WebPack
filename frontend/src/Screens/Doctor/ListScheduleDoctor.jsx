import React, { useState } from 'react'

import {
  Table, Thead, Tbody, Tr, Th, Td, Box, Stack, Center, Select, Text, Button, List, Input,
  ListItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Flex,


} from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useListDoctorScheduleQuery } from "../../slices/doctorApiSlice"
// import VerifyPage from './verifyPage';
import { useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import DoctorViewPatient from './DoctorViewPatient';
import Consultain from './Consultain';
import Pagination from '../../Components/Paginaton';
import DoctorBookSlots from './DoctorBookSlots';

function ListScheduleDoctor() {
  const { doctorInfo } = useSelector((state) => state.doctorAuth)
  const [status, setStatus] = useState("all")
  const { data: appointment, isLoading, refetch: refetchAppointment } = useListDoctorScheduleQuery({ _id: doctorInfo._id, status })
  const [startIndex, setStartIndex] = useState();
  const [endIndex, setEndIndex] = useState();
  const [appointmentDetails, setappointmentDetails] = useState()
  const [totalAppointement, setTotalAppointement] = useState()
  const [searchQuery, setSearchQuery] = useState('');



  useEffect(() => {
    if (appointment) {
      setTotalAppointement(appointment.length);
      setappointmentDetails(appointment.slice(startIndex, endIndex));
    }
  }, [startIndex, endIndex, appointment, setTotalAppointement]);


  const handleStatus = (e) => {
    setStatus(e.target.value)
    setSearchQuery('')
    refetchAppointment()
    console.log(status, 'hhhhhhhhhhh')
  }

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchQuery(searchValue);

    const filteredData = appointment?.filter(item =>
      item.name.toLowerCase().includes(searchValue)
    );

    setappointmentDetails(filteredData);
  };


  return (
    <Box mt="20" maxW='1000px' overflowX="auto" >
      {appointment && appointment.length === 0 ? (
        <Center h="50vh">
          <Text>No Appointments</Text>
        </Center>
      ) :

        <Box>
           <Flex justifyContent="space-between">
            <Box>
            <DoctorBookSlots />
            </Box>
             <Box>
              <Input
                maxW='40'
                bg="gray.200"
                type="text"
                placeholder="Search..."
                onChange={handleSearch}
                mb={4} // Adding margin bottom for spacing
              />
              </Box>
              </Flex>
 


      

          <Stack spacing="20px" direction={{ base: 'column', md: 'row' }}>
            <Box flex="1" p="20px" borderRadius="lg" backgroundColor="white" overflowX="auto">
              <Table variant="simple" borderRadius="1g">
                <Thead>
                  <Tr>
                    <Th bg="blue.200" color={'black'} textAlign="center">Name</Th>
                    <Th bg="blue.200" color={'black'} textAlign="center">Date</Th>
                    <Th bg="blue.200" color={'black'} textAlign="center">Time</Th>
                    <Th bg="blue.200" color={'black'} textAlign="center">Method</Th>
                    <Th bg="blue.200" color={'black'} textAlign="center">
                      <Menu>
                        <MenuButton as={Button} fontSize='sm' bg="blue.200" rightIcon={<ChevronDownIcon />}>
                          STATUS
                        </MenuButton>
                        <MenuList>
                          <MenuItem onClick={handleStatus} value='Pending' >Pending</MenuItem>
                          <MenuItem onClick={handleStatus} value='Completed' >Completed</MenuItem>
                          <MenuItem onClick={handleStatus} value='all' >View all</MenuItem>
                        </MenuList>
                      </Menu>
                    </Th>
                    <Th bg="blue.200" color={'black'} textAlign="center">Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>

                  {appointmentDetails &&
                    appointmentDetails.map((item, index) => {
                      // Create a Date object from the original date string
                      const formattedDate = new Date(item.date);

                      // Format the date to display date first, then month and year
                      const formattedDateString = formattedDate.toLocaleString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      });

                      return (
                        <Tr key={index}>
                          <Td textAlign="center">{item.name}</Td>
                          <Td textAlign="center">{formattedDateString}</Td> {/* Display formatted date */}
                          <Td textAlign="center">{item.time}</Td>
                          <Td textAlign="center">{item.method}</Td>
                          <Td color={item.status === "Pending" ? 'red' : 'green'} textAlign="center">{item.status}</Td>
                          <Td textAlign="center">
                            <Consultain _id={item.patientId} appointmentId={item._id} refetchAppointment={refetchAppointment}
                              method={item.method} user={item.user} />
                            {/* <DoctorViewPatient/> */}
                          </Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>

            </Box>

          </Stack>
        </Box>


      }
      {appointment && appointment?.length !== 0 ?
        <Box mt="auto" >
          <Pagination
            setStartIndex={setStartIndex}
            setEndIndex={setEndIndex}
            total={totalAppointement}
          />
        </Box>
        : null}
    </Box>


  )
}

export default ListScheduleDoctor


