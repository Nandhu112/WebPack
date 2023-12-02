import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React from 'react'
import {useChekUserBlockedQuery} from "../slices/userApiSlice"
import BlockedModal from "./BlockedModal";


const privateRoute = () => {
    const {userInfo}= useSelector((state)=>state.auth)
    const { data , refetch } = useChekUserBlockedQuery({ _id: userInfo._id })

  return (
    // data? data.Blocked?
    // userInfo ? <Outlet/> : <Navigate to='/userLogin' replace/>
    data && data.Blocked ? <BlockedModal /> : (userInfo ? <Outlet /> : <Navigate to="/userLogin" replace />)

    // <Button onClick={fun}>chkkk</Button>
   )
}

export default privateRoute