import React from 'react'
import { toast } from "react-toastify";
import AddDepartments from './AdminComponents/AddDepartments';
import Pagination from '../../Components/Paginaton';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Stack, Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody, } from "@chakra-ui/react";
import { useAdminListDepartmentQuery, useBlockDepartmentMutation, useUnBlockDepartmentMutation } from "../../slices/adminApiSlice"
import { useState,useEffect } from 'react';

function DepartmentAdmin() {

   

    const [status, setstatus] = useState('unblocked')
    const [totalDepartment, setTotalDepartment] = useState();
    const [startIndex, setStartIndex] = useState();
    const [endIndex, setEndIndex] = useState();
    const [departmentDetails, setDepartmentDetails] = useState();

    const { data: departments, isLoading, refetch } = useAdminListDepartmentQuery({status})
   
    useEffect(() => {
        if (departments) {
            setTotalDepartment(departments.length);
            setDepartmentDetails(departments.slice(startIndex, endIndex));
        }
      }, [startIndex, endIndex, departments, setDepartmentDetails]);
    
    return (
        <Box>
            <Box mb="10" display="flex" justifyContent="space-between">
                <Button onClick={() => {
                refetch()
                setstatus(status == 'unblocked' ? "blocked" : 'unblocked')
              
            }}  colorScheme='blue' className='pl-10' mb="10">{status == 'unblocked' ? 'View Bolcked List' : "view UnBlocked List"}</Button>
                <AddDepartments refetch={refetch} />
               
            </Box>

            <Stack spacing="20px" direction={{ base: "column", md: "row" }}>
                <Box overflowX={{ base: "auto", md: "unset" }} flex="1" p="20px" borderRadius="lg" backgroundColor="white">
                    <Table variant="simple" borderRadius="1g">
                        <Thead>
                            <Tr>

                                <Th bg="green.200" textAlign="center">Name</Th>
                                <Th bg="blue.200" textAlign="center">Hospitals</Th>
                                <Th bg="purple.200" textAlign="center">Appointments</Th>
                                <Th bg="green.200" textAlign="center">Records</Th>
                                <Th bg="blue.200" textAlign="center">Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {departmentDetails && departmentDetails.map((item, index) =>
                                <Tr>
                                    <Td textAlign="center">{item.name}</Td>
                                    <Td textAlign="center">{item.hospital.length}</Td>
                                    <Td textAlign="center">{item.appointments}</Td>
                                    <Td textAlign="center">{item.history}</Td>
                                    <Td textAlign="center">
                                    {status!== "blocked" ? <TestPopup refetch={refetch} user_id={item._id} />:<TestPopupUnblock refetch={refetch} user_id={item._id} />}
                                    </Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </Box>
            </Stack>
            <Pagination
            setStartIndex={setStartIndex}
            setEndIndex={setEndIndex}
            total={totalDepartment}
          />
        </Box>
    )
}

export default DepartmentAdmin


const TestPopup = ({ user_id, refetch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [blockUser, { isLoading }] = useBlockDepartmentMutation();

    const handleConfirm = async () => {
        console.log(user_id, 'chkk handleConfirm ')
        const res = await blockUser({ user_id }).unwrap();
        toast.success(res.success);
        refetch()
        setIsOpen(false);
    };

    return (
        <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <PopoverTrigger>
                <Button colorScheme="red" onClick={() => setIsOpen(true)}>Block</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Are you sure ?</PopoverHeader>
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

const TestPopupUnblock = ({ user_id, refetch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [unBlockUser, { isLoading }] = useUnBlockDepartmentMutation();

    const handleConfirm = async () => {
        console.log(user_id, 'chkk handleConfirm ')
        const res = await unBlockUser({ user_id }).unwrap();
        toast.success(res.success);
        refetch()
        setIsOpen(false);
    };

    return (
        <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <PopoverTrigger>
                <Button colorScheme="green" onClick={() => setIsOpen(true)}>Un Block</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Are you sure ?</PopoverHeader>
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