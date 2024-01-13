import React,{useState} from 'react'
import { toast } from "react-toastify";

import { Table, Thead, Tbody, Tr, Th, Td, Box, Stack, Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,} from "@chakra-ui/react";
import { useAdminListDoctorQuery ,useBlockDoctorMutation,useUnBlockDoctorMutation } from "../../slices/adminApiSlice"
import { useEffect } from 'react';


function DoctorAdmin() {
    const [status, setstatus] = useState('unblocked')
    const { data: hospitals, isLoading, refetch } = useAdminListDoctorQuery({status})
   
  return (
    <Box overflowX="auto">
     <Box mb="10" display="flex" justifyContent="space-between">
     <Button onClick={() => {
                refetch()
                setstatus(status == 'unblocked' ? "blocked" : 'unblocked')
              
            }}colorScheme='blue' className='pl-10' >
      {status == 'unblocked' ? 'View Bolcked List' : "view UnBlocked List"}
     </Button>

     </Box>   
    <Stack spacing="20px" direction={{ base: "column", md: "row" }}>
    <Box overflowX="auto" flex="1" p="20px" borderRadius="lg" backgroundColor="white">
        <Table variant="simple" borderRadius="1g">
            <Thead>
                <Tr>
                    <Th bg="blue.200" color={'black'} textAlign="center">Name</Th>
                    <Th bg="blue.200" color={'black'} textAlign="center">Hospital</Th>
                    <Th bg="blue.200" color={'black'} textAlign="center">Departments</Th>      
                    <Th bg="blue.200" color={'black'} textAlign="center">Appointments</Th>
                    <Th bg="blue.200" color={'black'} textAlign="center">Records</Th>
                    <Th bg="blue.200" color={'black'} textAlign="center">Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
            {hospitals && hospitals?.map((item,index) =>
                <Tr>
                    <Td textAlign="center">{item.hospitalDetails.name}</Td>          
                    <Td textAlign="center">{item.hospitalDetails.hospital.name}</Td>
                    <Td textAlign="center">{item.hospitalDetails.department.name}</Td>
                    <Td textAlign="center">{item.appointmentCount}</Td>
                    <Td textAlign="center">{item.historyCount}</Td>
                    <Td textAlign="center">
                    {status!== "blocked" ? <TestPopup refetch={refetch} user_id={item?.hospitalDetails?._id} />:<TestPopupUnblock refetch={refetch} user_id={item?.hospitalDetails?._id} />}
                    </Td>
                </Tr>
            )}
            </Tbody>
        </Table>
    </Box>
</Stack>
</Box>

  )
}

export default DoctorAdmin


const TestPopup = ({ user_id, refetch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [blockUser, { isLoading }] = useBlockDoctorMutation();

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
    const [unBlockUser, { isLoading }] = useUnBlockDoctorMutation();

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