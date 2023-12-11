import asyncHandler from "express-async-handler"
import { addRecord,getAppointmentStatus } from "../helpers/historyHelper.js"

const addNewRecordtoHistory = asyncHandler(async (req, res) => {
    const { doctor, patient,testResults,medicationList,treatments,description,appointmentId} = req.body;
    // console.log( doctor, patient,testResults,medicationList,treatments,description,"chkkkk.........")
    const result = await addRecord(doctor, patient,testResults,medicationList,treatments,description,appointmentId,res);
    res.json(result); // Send the result back to the client    
});

const doctorGetAppointmentStatus = asyncHandler(async (req, res) => { 
    const {appointmentId} = req.query;
    console.log(appointmentId,"doctorGetAppointmentStatus---------------------++++")
    const result = await getAppointmentStatus(appointmentId,res);
    res.json(result); // Send the result back to the client    
});


export{
    addNewRecordtoHistory,
    doctorGetAppointmentStatus
}