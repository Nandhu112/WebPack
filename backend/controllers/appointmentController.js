import asyncHandler from "express-async-handler"

import {userMakeAppointment,userListDoctorAppointments,doctorBlockSlot} from "../helpers/appointmentHelper.js"

const makeAppointment = asyncHandler(async (req, res) => {   
  console.log('chk makeAppointment')       
    const { slot,dId,pId,method,hospital,department,user } = req.body;
    console.log(method,hospital,department,user,'chk makeAppointment')   
    const result = await userMakeAppointment(slot,dId,pId,method,hospital,department,user,res);
    res.json(result); // Send the result back to the client
  });

  const doctorSlotBlock = asyncHandler(async (req, res) => {    
    console.log('chk makeAppointment.............')  
      const { Bslot,dId,date} = req.body
      const result = await doctorBlockSlot(Bslot,dId,date,res);
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
    listDoctorAppointments,
    doctorSlotBlock
  }