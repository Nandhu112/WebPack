import React from 'react'
import ApplyVerification from './ApplyVerification'
import {useGetHospitalInfoQuery} from "../../../slices/hospitalApiSlice"
import { useSelector } from "react-redux";
import HospitalBarChart from '../HospitalBarChart';
import HospitalPieChart from '../HospitalPieChart';
import { Box, Button, Flex, Stack, Text, Icon, Image, Center, Heading } from '@chakra-ui/react'
import {useHospitalGetDepartmentHistoryQuery,useHospitalGetDoctorHistoryQuery,useHospitalGetBoxsDataQuery} from "../../../slices/hospitalApiSlice"

import { FaFileAlt } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { TbBrandBooking } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { FcDepartment } from "react-icons/fc";



function HospitalDash() {
    const { hospitalInfo } = useSelector((state) => state.hospitalAuth)
    const { data:departmentdash, refetch:refetchDepartmentdash } = useHospitalGetDepartmentHistoryQuery({ _id: hospitalInfo._id })
    const { data:doctordash, refetch:refetchDoctordash } = useHospitalGetDoctorHistoryQuery({ _id: hospitalInfo._id })
    const { data:boxData, refetch:refetchBoxData } = useHospitalGetBoxsDataQuery({ _id: hospitalInfo._id })

    const fun = () => {
      console.log(boxData, "hospitalData")
    }
  return (
   <Box>
     <Flex flexDirection={"column"} mt={10}>
        <Stack
          mb={5}
          flexDirection={"row"}
          justifyContent={"space-between"}
          wrap={"wrap"}
        >
          <Box
            p={2}
            bgColor={"blue.100"}
            minW={40}
            minH={20}
            maxW={40}
            maxH={20}
            borderRadius={5}
          >

            <Text fontWeight={750} fontSize={"large"} color={"gray.800"}>
              {boxData?.appointment}
            </Text>

            <Stack
              justifyContent={"space-between"}
              flexDirection={"row"}
              pr={2}
              alignItems={"flex-end"}
            >
              <Text fontWeight={600} color={"gray.800"}>
              Appointments
              </Text>
              <Icon as={TbBrandBooking} boxSize={8}></Icon>
            </Stack>
          </Box>
          <Box
            p={2}
            bgColor={"green.100"}
            minW={40}
            minH={20}
            maxW={40}
            maxH={20}
            borderRadius={5}
          >

            <Text fontWeight={750} fontSize={"large"} color={"gray.800"}>
              {boxData?.records}
            </Text>

            <Stack
              justifyContent={"space-between"}
              flexDirection={"row"}
              pr={2}
              alignItems={"flex-end"}
            >
              <Text fontWeight={600} color={"gray.800"}>
                Records
              </Text>
              <Icon as={FaFileAlt} boxSize={8}></Icon>
            </Stack>
          </Box>
          <Box
            p={2}
            bgColor={"blue.100"}
            minW={40}
            minH={20}
            maxW={40}
            maxH={20}
            borderRadius={5}
          >

            <Text fontWeight={750} fontSize={"large"} color={"gray.800"}>
            {boxData?.doctor}
            </Text>

            <Stack
              justifyContent={"space-between"}
              flexDirection={"row"}
              pr={2}
              alignItems={"flex-end"}
            >
              <Text fontWeight={600} color={"gray.800"}>
                Doctors
              </Text>
              <Icon as={FaUserDoctor} boxSize={8}></Icon>
            </Stack>
          </Box>
          <Box
            p={2}
            bgColor={"green.100"}
            minW={40}
            minH={20}
            maxW={40}
            maxH={20}
            borderRadius={5}
          >

            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Text
                fontWeight={750}
                fontSize={"large"}
                color={"gray.800"}
              >
                {boxData?.appointment}
              </Text>

            </Flex>

            <Stack
              justifyContent={"space-between"}
              flexDirection={"row"}
              pr={2}
              alignItems={"flex-end"}
            >
              <Text fontWeight={600} color={"gray.800"} lineHeight={1}>
                Departments
              </Text>
              <Icon  as={FcDepartment} boxSize={8}></Icon>
            </Stack>
          </Box>

        </Stack>

      </Flex>

    <Box>
          <Center style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}  >

            {departmentdash? <Box mt="20">
              <Center>
              <Heading fontSize={"lg"}>Departments</Heading>
              </Center>
            <HospitalPieChart  style={{ flex: '1 1 50%' }} data={departmentdash} />
            </Box>:null}
         { doctordash?  <Box  >
            <Center>
              <Heading fontSize={"xl"}>Doctors</Heading>
              </Center>
            <HospitalBarChart style={{ flex: '1 1 50%' }} data={doctordash} />
            </Box>:null}

          </Center>
        </Box> 
        <Button onClick={fun}>hii</Button>
   </Box>
    
  )
}

export default HospitalDash
