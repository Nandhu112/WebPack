import React, { useState } from 'react'
import HospitalImage from '../Hospital/HospitalHome/HospitalImage'
import HospitalHomeCard from '../Hospital/HospitalHome/HospitalHomeCard'
import Departments from '../Hospital/HospitalHome/Departments'
import HospitalFilter from '../Hospital/HospitalFilter'
import { Box, Flex, Card, Button, InputGroup, Select, Heading } from '@chakra-ui/react'
import { useUserListHospitalDoctorsQuery } from "../../slices/userApiSlice"
import { useSelector } from "react-redux";
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useUserListHospitalDepartmentsQuery } from "../../slices/userApiSlice"
import DirectChat from './Chat/DirectChat'
import { IconButton } from '@chakra-ui/react';
import { FaComment } from 'react-icons/fa';

function ViewHospital() {

  const location = useLocation();
  const _id = location.state;
  const [department, setDepartment] = useState("all")
  const { data: doctors, isLoading, refetch } = useUserListHospitalDoctorsQuery({ _id, department })
  const { data: departments, refetch: depatmentRefetch } = useUserListHospitalDepartmentsQuery({ id: _id })
  const [directChatOpen, setSirectChatOpen] = useState(false)
  const [rating, setRating] = useState(0);
  const selectHandler = (e) => {
    setDepartment(e.target.value)
    refetch()
  }
  return (
    <Box bg="blue.100">
      <HospitalImage />
      <Box mt='10'>
        <Flex>
          <Box>
        
      
            {directChatOpen ?
             <DirectChat hospitalId={_id} setSirectChatOpen={setSirectChatOpen} /> 
             : null}
          </Box>
          <InputGroup   >
            <Select onChange={selectHandler} ml='auto' mr="20" mb="20" bg={'gray.200'} maxW='200px' maxH='30px' placeholder="Select Department">
              {departments && departments.map((item, index) =>
                <option value={item._id}>{item.name}</option>
              )}
              <option value='all'>View All</option>
            </Select>
          </InputGroup>
        </Flex>



        {/* Display rating component, passing rating and setRating */}
        {/* <DoctorRating  rating={rating} setRating={setRating}/> */}



        <Box>
          <Box ml={4}>
            <Flex flexWrap="wrap">
              {doctors && doctors.map((item, index) =>
                <HospitalHomeCard item={item} />
              )}
            </Flex>
          </Box>
          <Box mt="10" ml="5" mb="10">
          </Box>
        </Box>
      </Box>
      <Box position="sticky" bottom="10px">
            <IconButton
              ml="100"
              icon={<FaComment />}
              aria-label="Chat"
              onClick={() => setSirectChatOpen(true)}
            />
            </Box>
    </Box>
  )
}

export default ViewHospital
