import asyncHandler from "express-async-handler"

import {userMakeAppointment,userListDoctorAppointments} from "../helpers/appointmentHelper.js"

const makeAppointment = asyncHandler(async (req, res) => {   
  console.log('chk makeAppointment')       
    const { slot,dId,pId,method,hospital,department } = req.body;
    console.log(method,hospital,department ,'chk makeAppointment')   
    const result = await userMakeAppointment(slot,dId,pId,method,hospital,department,res);
    res.json(result); // Send the result back to the client
  });

  const listDoctorAppointments =asyncHandler(async (req,res)=>{   
   
    const {date,_id} = req.body;
    console.log(date,'chk listDoctorAppointments')
    const result =  await userListDoctorAppointments(date,_id)   
    res.json(result);
  })


  export{
    makeAppointment,
    listDoctorAppointments
  }