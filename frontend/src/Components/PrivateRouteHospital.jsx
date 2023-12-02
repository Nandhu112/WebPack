import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React from 'react'
import {useCheckHospitalBlockQuery} from "../slices/hospitalApiSlice"
import BlockedModal from "./BlockedModal";
import { Button } from "@chakra-ui/react";


const privateRoute = () => {

    const {hospitalInfo}= useSelector((state)=>state.hospitalAuth)
    const { data , refetch } = useCheckHospitalBlockQuery({ _id: hospitalInfo?._id })

    const fun=()=>{
      console.log(hospitalInfo,data,'hospitalInfo')
    }
  return (
    // hospitalInfo ? <Outlet/> : <Navigate to='/hospital/hospitalLogin' replace/>
    data && data.Blocked ? <BlockedModal /> : (hospitalInfo ? <Outlet /> : <Navigate to="/userLogin" replace />)
      // <Button onClick={fun}>chkkk</Button>
     
   )
}

export default privateRoute