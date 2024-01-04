import asyncHandler from "express-async-handler"
import {adminGetdepartment,adminGetBoxs,hospitalHistoryCount,hospitaldepartmentHistory,
  hospitalDoctorHistory,hospitalGetBoxs} from "../helpers/dashboardHelper.js"

const adminGetDeptDashboard = asyncHandler(async (req, res) => {
    console.log("chk adminGetDeptDashboard")
    const result = await adminGetdepartment();
    res.json(result); // Send the result back to the client
  });

  const adminGetDeptDashboardBoxs = asyncHandler(async (req, res) => {
    console.log("chk adminGetDeptDashboard")
    const result = await adminGetBoxs();
    res.json(result); // Send the result back to the client
  });
  const adminGethospitalHistoryCount = asyncHandler(async (req, res) => {
    console.log("chk adminGethospitalHistoryCount")
    const result = await hospitalHistoryCount();
    res.json(result); // Send the result back to the client
  });
  const HospitalGetDepartmentHistory = asyncHandler(async (req, res) => {
    const { _id } = req.query;
    console.log(_id,"chk HospitalGetDepartmentHistory")
    const result = await hospitaldepartmentHistory(_id);
    res.json(result); // Send the result back to the client
  });
  const HospitalGetDoctorHistory = asyncHandler(async (req, res) => {
    const { _id } = req.query;
    console.log("chk HospitalGetDepartmentHistory")
    const result = await hospitalDoctorHistory(_id);
    res.json(result); // Send the result back to the client
  });
  const hospitalGetBoxsData = asyncHandler(async (req, res) => {
    const { _id } = req.query;
    console.log("chk HospitalGetDepartmentHistory")
    const result = await hospitalGetBoxs(_id);
    res.json(result); // Send the result back to the client
  });



  export{
    adminGetDeptDashboard,
    adminGetDeptDashboardBoxs,
    adminGethospitalHistoryCount,
    HospitalGetDepartmentHistory,
    HospitalGetDoctorHistory,
    hospitalGetBoxsData
  }