import express  from "express";
import { protect } from "../middleware/authMiddleware.js";
const router= express.Router()

import { 
    authAdmin,
    adminGetHospitalVerification,
    adminVerifyHospitals

} from "../controllers/adminController.js";

import {listAllUsers,adminBlockUser,adminUnBlockUser} from "../controllers/userController.js"
import {listAllHospitals,  adminBlockHospital,adminUnBlockHospital} from "../controllers/hospitalController.js"

import {listAllDoctors,adminBlockDoctor,adminUnBlockDoctor} from "../controllers/doctorController.js"

import{addNewDepartment,listAllDepartment,   adminBlockDepartment,adminUnBlockDepartment} from "../controllers/departmentController.js"
import {adminGetDeptDashboard,adminGetDeptDashboardBoxs,adminGethospitalHistoryCount} from "../controllers/dashboardController.js"

router.post('/auth',authAdmin)
router.post('/addNewDepartment',protect, addNewDepartment)
router.get('/adminListDepartment',protect, listAllDepartment)
router.get('/adminListHospitals',protect, listAllHospitals)
router.get('/adminListDoctors',protect, listAllDoctors)
router.get('/adminListUsers', listAllUsers)
router.post('/adminBlocktUser',protect, adminBlockUser)
router.post('/adminUnBlocktUser',protect, adminUnBlockUser)
router.post('/adminBlockDoctor',protect, adminBlockDoctor)
router.post('/adminUnBlockDoctor',protect,adminUnBlockDoctor)
router.post('/adminBlockHospital',protect, adminBlockHospital)       
router.post('/adminUnBlockHospital',protect, adminUnBlockHospital)
router.post('/adminBlockDepartment',protect, adminBlockDepartment)
router.post('/adminUnBlockDepartment',protect, adminUnBlockDepartment)
router.get('/getVerification',protect, adminGetHospitalVerification)
router.get('/adminGetDeptDashboard',protect, adminGetDeptDashboard)
router.get('/adminGetDeptDashboardBoxs',protect, adminGetDeptDashboardBoxs)
router.get('/adminGethospitalHistoryCount',protect, adminGethospitalHistoryCount)
router.post('/Verification',protect, adminVerifyHospitals)

export default router
   


