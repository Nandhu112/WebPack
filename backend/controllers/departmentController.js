import asyncHandler from "express-async-handler"
import {addDepartment,
        listDepartment,
        hospitalAddDepartment,
        listHospitalAllDepartments,
        blockDepartment,
        unBlockDepartment
} from "../helpers/departmentHelper.js"

// @dese Register a new user
// route POST/api/admin/addDepartment
//@access public
const addNewDepartment = asyncHandler(async (req, res) => {   
    const { name } = req.body;
    const result = await addDepartment(name, res);
    res.json(result); // Send the result back to the client
  });


  const listAllDepartment = asyncHandler(async (req, res) => {
    const status=req.query.status || 'unBlocked'
    const result = await listDepartment(status);
    res.json(result); // Send the result back to the client
  });

 const HospitalAddNewDepartment =asyncHandler(async (req,res)=>{
    const {h_id,dept_id}=req.body
    const result =  await hospitalAddDepartment (h_id,dept_id)
    res.json(result);
 })

 const listHospitalDepartments =asyncHandler(async (req,res)=>{   
  console.log('chk listHospitalDepartments')
  const {id} = req.query;
  console.log(id,'chk listHospitalDepartments')  
  const result =  await listHospitalAllDepartments(id)
  res.json(result);
})

const adminBlockDepartment =asyncHandler(async (req,res)=>{
  const {user_id } =req.body
  const result =  await blockDepartment(user_id)
  res.json(result);
})
const adminUnBlockDepartment =asyncHandler(async (req,res)=>{
  const {user_id } =req.body
  const result =  await unBlockDepartment(user_id)
  res.json(result);
})


  

  export {
    addNewDepartment,
    listAllDepartment,          
    HospitalAddNewDepartment,
    listHospitalDepartments,
    adminBlockDepartment,
    adminUnBlockDepartment
} 

