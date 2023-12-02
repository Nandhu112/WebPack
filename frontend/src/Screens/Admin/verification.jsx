import React,{useState} from 'react'
import { toast } from "react-toastify";

import { Table, Thead, Tbody, Tr, Th, Td, Box, Stack, Button,
  } from "@chakra-ui/react";
import {useAdminGetVerificationQuery } from "../../slices/adminApiSlice"
import VerifyPage from './verifyPage';
import { useEffect } from 'react';


function verification() {
    const { data: verification, isLoading, refetch } = useAdminGetVerificationQuery({status})
  return (
    <Box mt="20">

   <Stack spacing="20px" direction={{ base: "column", md: "row" }}>
   <Box overflowX={{ base: "auto", md: "unset" }} flex="1" p="20px" borderRadius="lg" backgroundColor="white">
       <Table variant="simple" borderRadius="1g">
           <Thead>
               <Tr>
                   <Th bg="purple.200" textAlign="center">Name</Th>
                   <Th bg="green.200" textAlign="center">Date</Th>
                   <Th bg="blue.200" textAlign="center">Departments</Th>      
                   <Th bg="purple.200" textAlign="center">Doctors</Th>
                   <Th bg="green.200" textAlign="center">Status</Th>
                   <Th bg="blue.200" textAlign="center">Actions</Th>
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
