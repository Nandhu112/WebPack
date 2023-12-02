import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React from 'react'


function PrivateRouteAdmin() {
    console.log('Admin private')
    const { adminInfo } = useSelector((state) => state.adminAuth)
    return (
        adminInfo ? <Outlet /> : <Navigate to='/admin/adminLogin' replace />
    )
}

export default PrivateRouteAdmin
