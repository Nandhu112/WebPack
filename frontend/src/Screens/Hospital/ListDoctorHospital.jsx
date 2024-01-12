import React,{useState} from 'react'
import { toast } from "react-toastify";
import HospitalAddDepartment from './HospitalAddDepartment';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Stack, Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    InputGroup,
    Select,
    Flex} from "@chakra-ui/react";
 import { useSelector } from "react-redux";
import {useHospitalListDoctorsQuery,useHospitalListDepartmentsQuery} from "../../slices/hospitalApiSlice"
import AddDoctorModal from './AddDoctorModal';
import DoctorProfileHosptial from './DoctorProfileHosptial';



function ListDoctorHospital() {
    const { hospitalInfo } = useSelector((state) => state.hospitalAuth)
  const _id=hospitalInfo._id
  const [department, setDepartment] = useState("all")
    const { data: departments, refetch:depatmentRefetch } = useHospitalListDepartmentsQuery({ id:_id})
    const { data: doctors, isLoading, refetch } = useHospitalListDoctorsQuery({_id,department})
    const [openAddDepartment, setOpenAddDepartment] = useState(false)


      
    const selectHandler=(e)=>{ 
        const selectedValue = event.target.value;
        if (selectedValue === 'add') {
          openAddDepartmentHandler(); // Call your function here for adding a new department
          setDepartment(department)
        } else {
            setDepartment(e.target.value)
            refetch()
        }
    
      }
      const fun=()=>{
        console.log(department,"department")
      }
      const openAddDepartmentHandler=()=>{
        console.log("openAddDepartmentHandler")
        setOpenAddDepartment(true)
      }
  return (
    <Box>
   <Flex justifyContent="space-between">
   <AddDoctorModal refetch={refetch}/>
   <InputGroup   >
      <Select onChange={selectHandler}  ml='auto'  bg={'gray.200'} maxW='200px' maxH='30px' >
      {departments && departments.map((item,index) =>
      <option value={item._id}>{item.name}</option>
      )}
      <option value='all'>All Departments</option>
      <option  value="add">Add new Department</option>
    </Select>
  </InputGroup>
  {openAddDepartment?<HospitalAddDepartment setOpenAddDepartment={setOpenAddDepartment} />:null}
  
  </Flex>

   <Stack mt="10" spacing="20px"  direction={{ base: "column", md: "row" }}>
   <Box overflowX={{ base: "auto", md: "unset" }} flex="1" p="20px" borderRadius="lg" backgroundColor="white">
       <Table variant="simple" borderRadius="1g">
           <Thead>
               <Tr>
                   <Th bg="purple.200" textAlign="center">Name</Th>
                   <Th bg="green.200" textAlign="center">Title</Th>
                   <Th bg="blue.200" textAlign="center">Departments</Th>      
                   <Th bg="purple.200" textAlign="center">Appointments</Th>
                   <Th bg="green.200" textAlign="center">Records</Th>
                   <Th bg="blue.200" textAlign="center">Actions</Th>
               </Tr>
           </Thead>
           <Tbody>
           {doctors && doctors.map((item,index) =>
               <Tr>
                   <Td textAlign="center">{item.name}</Td>          
                   <Td textAlign="center">{item.title}</Td>
                   <Td textAlign="center">{item.department}</Td>
                   <Td textAlign="center">{item.appointment}</Td>
                   <Td textAlign="center">{item.history}</Td>
                   <Td textAlign="center">
                    <DoctorProfileHosptial item={item}/>
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

export default ListDoctorHospital


const TestPopup = ({ user_id, refetch }) => {
    const [isOpen, setIsOpen] = useState(false);


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
                <Button colorScheme="red" onClick={() => setIsOpen(true)}>Delete</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Are you sure ?</PopoverHeader>
                <PopoverBody>

                    <Button colorScheme="red" mr={2} >
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

