import React, { useState } from 'react'
import HospitalImage from '../Hospital/HospitalHome/HospitalImage'
import HospitalHomeCard from '../Hospital/HospitalHome/HospitalHomeCard'
import Departments from '../Hospital/HospitalHome/Departments'
import HospitalFilter from '../Hospital/HospitalFilter'
import { Box,Flex,Card,Button, InputGroup,Select } from '@chakra-ui/react'
import {useUserListHospitalDoctorsQuery} from "../../slices/userApiSlice"
import { useSelector } from "react-redux";
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import {useUserListHospitalDepartmentsQuery} from "../../slices/userApiSlice"
function ViewHospital() {

        const location = useLocation();
        const _id = location.state;
        const [department, setDepartment] = useState("all")
        const { data: doctors, isLoading, refetch } = useUserListHospitalDoctorsQuery({_id,department})
        const { data: departments, refetch:depatmentRefetch } = useUserListHospitalDepartmentsQuery({ id:_id})
       
        const selectHandler=(e)=>{ 
          setDepartment(e.target.value)
          refetch()
        }
  return (
    <Box bg="blue.100">
    <HospitalImage />
    <Box mt='10'>

    <InputGroup   >
      <Select onChange={selectHandler}  ml='auto' mr="20" mb="20" bg={'gray.200'} maxW='200px' maxH='30px' placeholder="Select Department">
      {departments && departments.map((item,index) =>
      <option value={item._id}>{item.name}</option>
      )}
      <option value='all'>View All</option>
    </Select>
  </InputGroup>
  
      <Box>
      <Box ml={4}> 
        <Flex flexWrap="wrap"> 
        {doctors && doctors.map((item,index) =>
          <HospitalHomeCard item={item} />
        )}
        </Flex>
      </Box>
      <Box mt="10" ml="5" mb="10">
    </Box>
      </Box>


    </Box>
    </Box>
  )
}

export default ViewHospital
