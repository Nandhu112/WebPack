import React from 'react'
import AddDepartments from './AdminComponents/AddDepartments'
import PieChart from './PieChart'
import { useAdminGetDeptDashQuery, useAdminGetDeptDashboardBoxsQuery,useAdminGethospitalHistoryCountQuery } from "../../slices/adminApiSlice"
import { Box, Button, Flex, Stack, Text, Icon, Image, Center, Heading } from '@chakra-ui/react'
// import { Box, Flex, Icon, Image, Stack, Text } from "@chakra-ui/react";
import BarChart from './BarChart'
import { FaSackDollar, FaUsersBetweenLines } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { TbBrandBooking } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { FaHospitalAlt } from "react-icons/fa";


function AdminHome() {
  const { data: useAdminGetDeptDashQuery1, refetch: refetchUseAdminGetDeptDashQuery1 } = useAdminGetDeptDashQuery()
  const { data: boxItems, refetch: refetchBoxItems } = useAdminGetDeptDashboardBoxsQuery()
  const { data: hospitalData, refetch: refetchhospitalData} = useAdminGethospitalHistoryCountQuery()

  const fun = () => {
    console.log(hospitalData, "hospitalData")
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
              {boxItems?.history}
            </Text>

            <Stack
              justifyContent={"space-between"}
              flexDirection={"row"}
              pr={2}
              alignItems={"flex-end"}
            >
              <Text fontWeight={600} color={"gray.800"}>
                Bookings
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
              {boxItems?.user}
            </Text>

            <Stack
              justifyContent={"space-between"}
              flexDirection={"row"}
              pr={2}
              alignItems={"flex-end"}
            >
              <Text fontWeight={600} color={"gray.800"}>
                Users
              </Text>
              <Icon as={FaUsers} boxSize={8}></Icon>
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
              {boxItems?.doctor}
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
                {boxItems?.hospital}
              </Text>

            </Flex>

            <Stack
              justifyContent={"space-between"}
              flexDirection={"row"}
              pr={2}
              alignItems={"flex-end"}
            >
              <Text fontWeight={600} color={"gray.800"} lineHeight={1}>
                Hospitals
              </Text>
              <Icon as={FaHospitalAlt} boxSize={8}></Icon>
            </Stack>
          </Box>

        </Stack>

      </Flex>

      {useAdminGetDeptDashQuery1 ?
        <Box>
          <Center style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

             <Box mt="20">
              <Center>
              <Heading fontSize={"lg"}>Departments</Heading>
              </Center>
            <PieChart data={useAdminGetDeptDashQuery1} style={{ flex: '1 1 50%' }} />
            </Box>
            <Box>
            <Center>
              <Heading fontSize={"xl"}>Hospitals</Heading>
              </Center>
            <BarChart style={{ flex: '1 1 50%' }} data={hospitalData} />
            </Box>

          </Center>
        </Box> : null
      }
      <Button onClick={fun}>hii</Button>

    </Box>

  )
}

export default AdminHome
