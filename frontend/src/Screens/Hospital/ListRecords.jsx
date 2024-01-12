import React,{useState} from 'react'
import { toast } from "react-toastify";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Stack, Button} from "@chakra-ui/react";
import { FaTimes } from 'react-icons/fa';
import { ChakraProvider,  Drawer, DrawerContent, DrawerOverlay, DrawerHeader, DrawerBody } from "@chakra-ui/react";
 import { useSelector } from "react-redux";

import {useHospitalListRecordsQuery} from "../../slices/hospitalApiSlice"
import ViewRecord from './ViewRecord';

function ListRecords() {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const { hospitalInfo } = useSelector((state) => state.hospitalAuth)
    const { data: records, refetch:refetchRecords } = useHospitalListRecordsQuery({ _id:hospitalInfo?._id})
    // const [isDrawerOpen, setIsDrawerOpen] = useState(drawerOpen);
    const fun=()=>{
        console.log(records,"records")
        setDrawerOpen(true)
    }
    const drawerClose=()=>{
        setDrawerOpen(false)
    }
  return (
    <Box>

{drawerOpen?
     <ChakraProvider>
     <Box display="flex">
       {/* Permanently Open Drawer */}
       <Drawer placement="left" isOpen={true} onClose={() => drawerClose()} size="lg">
         <DrawerOverlay />
         <DrawerContent>
           <DrawerHeader display="flex" alignItems="center">
             Drawer Title

           </DrawerHeader>
           <DrawerBody>
             {/* Drawer content goes here */}
             <ViewRecord/>
           </DrawerBody>
         </DrawerContent>
       </Drawer>

       {/* Main content */}
       <Box p="4">
         {/* Your main content goes here */}
         <p>Main Content</p>
       </Box>
     </Box>
   </ChakraProvider>:null}

    <Stack mt="10" spacing="20px"  direction={{ base: "column", md: "row" }}>
    <Box overflowX={{ base: "auto", md: "unset" }} flex="1" p="20px" borderRadius="lg" backgroundColor="white">
        <Table variant="simple" borderRadius="1g">
            <Thead>
                <Tr>
                    <Th bg="purple.200" textAlign="center">Patien Name</Th>
                    <Th bg="green.200" textAlign="center">Department</Th>
                    <Th bg="blue.200" textAlign="center">Doctor</Th>      
                    <Th bg="purple.200" textAlign="center">Date</Th>
                    <Th bg="green.200" textAlign="center">Type</Th>
                    <Th bg="blue.200" textAlign="center">Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
            {records && records.map((item,index) =>
                <Tr>
                    <Td textAlign="center">{item.pName}</Td>          
                    <Td textAlign="center">{item.department}</Td>          
                    <Td textAlign="center">{item.dName}</Td>          
                    <Td textAlign="center">{item.appointmentId?.date}</Td>          
                    <Td textAlign="center">{item.appointmentId?.method}</Td>          
                 
                    <Td textAlign="center">
                     <Button colorScheme='blue' onClick={fun}>View more</Button>
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

export default ListRecords
