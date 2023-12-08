import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {useCheckDoctorBlockQuery} from "../slices/doctorApiSlice"
import React from 'react'
import BlockedModal from "./BlockedModal";

function PrivateRouteDoctor() {
    console.log('Hospital private')
    const { doctorInfo } = useSelector((state) => state.doctorAuth)
    const { data , refetch } = useCheckDoctorBlockQuery({ _id: doctorInfo?._id })
    return (
        // doctorInfo ? <Outlet /> : <Navigate to='/doctor/hospitalLogin' replace />
        data && data.Blocked ? <BlockedModal /> : (doctorInfo ? <Outlet /> : <Navigate to="/doctor/doctorLogin" replace />)
    )
}

export default PrivateRouteDoctor
