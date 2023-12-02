import React from 'react'
import HospitalImage from './HospitalImage'
import HospitalHomeCard from './HospitalHomeCard'
import AddDoctorModal from '../AddDoctorModal'
import Departments from './Departments'
import HospitalFilter from '../HospitalFilter'
import { Box,Flex,Card,Button } from '@chakra-ui/react'
import {useHospitalListDoctorsQuery} from "../../../slices/hospitalApiSlice"
import { useSelector } from "react-redux";
import { useEffect } from 'react'
import ApplyVerification from './ApplyVerification'
function HospitalHome() {

  const { hospitalInfo } = useSelector((state) => state.hospitalAuth)
  const _id=hospitalInfo._id
  console.log(_id,"_id")
  const { data: doctors, isLoading, refetch } = useHospitalListDoctorsQuery({_id})


  return (
    <div>
    <HospitalImage />
    <Box mt='10'>
    <Flex>
    <Box className='mt-10 ml-5' >
        <HospitalFilter />
     </Box>
      <Box>
      <Box ml={4}> {/* Add margin for spacing between filters and cards */}
        <Flex flexWrap="wrap"> {/* Use flex-wrap to wrap cards */}
        {doctors && doctors.map((item,index) =>
          <HospitalHomeCard item={item} />
        )}
        </Flex>
      </Box>
      <Box mt="10" ml="5" mb="10">
    <AddDoctorModal/>
    </Box>
      </Box>
    </Flex>
    </Box>
    <ApplyVerification/>
  </div>
  )
}

export default HospitalHome
