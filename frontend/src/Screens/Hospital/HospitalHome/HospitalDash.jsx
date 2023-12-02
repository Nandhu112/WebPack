import React from 'react'
import ApplyVerification from './ApplyVerification'
import {useGetHospitalInfoQuery} from "../../../slices/hospitalApiSlice"
import { useSelector } from "react-redux";



function HospitalDash() {
    const { hospitalInfo } = useSelector((state) => state.hospitalAuth)
    const { data: getHospital,isLoading, refetch } = useGetHospitalInfoQuery({ id: hospitalInfo._id })


  return (
    <div>
         <h1>This is hospital dashboard</h1>
    </div>
    
  )
}

export default HospitalDash
