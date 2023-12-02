import {addNewMember,listMembers, getUserPatientInfo} from "../helpers/patientHelper.js"
import asyncHandler from "express-async-handler"
import  jwt  from "jsonwebtoken";

const addNewPatient = asyncHandler(async (req, res) => {
  console.log("addNewPatient")
    const { name,date,bloodGroup,gender,_id } = req.body;
    const result = await addNewMember(_id,name,date,bloodGroup,gender , res);
    res.json(result); // Send the result back to the client
  });

  const listAllPatients = asyncHandler(async (req, res) => {   
    console.log("list patients")
    const {_id } = req.query;
    const result = await listMembers(_id,res);
    res.json(result); // Send the result back to the client
  });
  const getPatientInfo = asyncHandler(async (req, res) => { 
    let token
    token= req.cookies.jwt  
    console.log(token,'token.......')
    const {_id } = req.query;
    const result = await getUserPatientInfo(_id,res);
    res.json(result); // Send the result back to the client
  });


export { 
    addNewPatient,
    listAllPatients,
    getPatientInfo
   };