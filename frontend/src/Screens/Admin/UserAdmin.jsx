import React, { useState } from 'react'
import { toast } from "react-toastify";
import {
    Table, Thead, Tbody, Tr, Th, Td, Box, Stack, Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
} from "@chakra-ui/react";
import { useAdminLisUserQuery, useBlockUserMutation,useUnBlockUserMutation } from "../../slices/adminApiSlice"
import Loader from '../../Components/Loader';

function UserAdmin() {
    const [status, setstatus] = useState('unblocked')
    const { data: users, isLoading,isRefetching, refetch } = useAdminLisUserQuery({ status })

    return (
        <Box  overflowX="auto">
    <Button
        onClick={() => {
            setstatus(status === 'unblocked' ? 'blocked' : 'unblocked');
            console.log('chk status', status);
            refetch();
        }}
        colorScheme='blue'
        className='pl-10'
        mb="10"
    >
        {status === 'unblocked' ? 'View Blocked List' : 'View Unblocked List'}
    </Button>
    {isRefetching && <Loader />}
    <Box>
    <Stack spacing="20px" direction={{ base: 'column', md: 'row' }}>
            <Box flex="1" p="20px" borderRadius="lg" backgroundColor="white" overflowX="auto">
                <Table variant="simple" borderRadius="1g">
                    <Thead>
                        <Tr>
                            <Th bg="blue.200" color="black" textAlign="center">Name</Th>
                            <Th bg="blue.200" color="black" textAlign="center">Email</Th>
                            <Th bg="blue.200" color="black" textAlign="center">Members</Th>
                            <Th bg="blue.200" color="black" textAlign="center">Appointments</Th>
                            <Th bg="blue.200" color="black" textAlign="center">Records</Th>
                            <Th bg="blue.200" color="black" textAlign="center">Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users && users?.map((item, index) => (
                            <Tr key={index}>
                                <Td textAlign="center" maxW="100%">{item.userDetails.name}</Td>
                                <Td textAlign="center" maxW="100%">{item.userDetails.email}</Td>
                                <Td textAlign="center" maxW="100%">{item.patientCount}</Td>
                                <Td textAlign="center" maxW="100%">{item.appointmentCount}</Td>
                                <Td textAlign="center" maxW="100%">{item.historyCount}</Td>
                                <Td textAlign="center">
                                    {status !== 'blocked' ? (
                                        <TestPopup refetch={refetch} user_id={item._id} />
                                    ) : (
                                        <TestPopupUnblock refetch={refetch} user_id={item._id} />
                                    )}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Stack>
    </Box>
</Box>

    )
}

export default UserAdmin

const TestPopup = ({ user_id, refetch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [blockUser, { isLoading }] = useBlockUserMutation();

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
    const [unBlockUser, { isLoading }] = useUnBlockUserMutation();

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
