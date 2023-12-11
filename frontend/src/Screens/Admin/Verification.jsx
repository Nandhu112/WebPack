import React,{useState} from 'react'
import { toast } from "react-toastify";

import { Table, Thead, Tbody, Tr, Th, Td, Box, Stack, Button,
  } from "@chakra-ui/react";
import {useAdminGetVerificationQuery } from "../../slices/adminApiSlice"
import VerifyPage from './verifyPage';
import { useEffect } from 'react';


function verification() {
    const { data: verification, isLoading, refetch } = useAdminGetVerificationQuery()
  return (
    <Box mt="20" maxW='1000px' overflowX="auto" >

   <Stack spacing="20px" direction={{ base: 'column', md: 'row' }}>
   <Box flex="1" p="20px" borderRadius="lg" backgroundColor="white" overflowX="auto">
       <Table variant="simple" borderRadius="1g">
           <Thead>
               <Tr>
                   <Th bg="blue.200" color={'black'}textAlign="center">Name</Th>
                   <Th bg="blue.200" color={'black'}textAlign="center">Date</Th>
                   <Th bg="blue.200" color={'black'}textAlign="center">Departments</Th>      
                   <Th bg="blue.200" color={'black'}textAlign="center">Doctors</Th>
                   <Th bg="blue.200" color={'black'}textAlign="center">Status</Th>
                   <Th bg="blue.200" color={'black'}textAlign="center">Actions</Th>
               </Tr>
           </Thead>
           <Tbody>
  {verification &&
    verification.map((item, index) => {
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
          <Td textAlign="center">{item.department.length}</Td>
          <Td textAlign="center">{item.doctor.length}</Td>
          <Td color={item.status === "pending" ? 'red' : 'green'} textAlign="center">{item.status}</Td>
          <Td textAlign="center">
            <VerifyPage item={item} refetch={refetch}/>
          </Td>
        </Tr>
      );
    })}
</Tbody>
       </Table>
   </Box>
</Stack>
</Box>

  )
}

export default verification
