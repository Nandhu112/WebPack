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

router.post('/auth',authAdmin)
router.post('/addNewDepartment',addNewDepartment)
router.get('/adminListDepartment',listAllDepartment)
router.get('/adminListHospitals',listAllHospitals)
router.get('/adminListDoctors',listAllDoctors)
router.get('/adminListUsers',listAllUsers)
router.post('/adminBlocktUser',adminBlockUser)
router.post('/adminUnBlocktUser',adminUnBlockUser)
router.post('/adminBlockDoctor',adminBlockDoctor)
router.post('/adminUnBlockDoctor',adminUnBlockDoctor)
router.post('/adminBlockHospital',adminBlockHospital)       
router.post('/adminUnBlockHospital',adminUnBlockHospital)
router.post('/adminBlockDepartment',adminBlockDepartment)
router.post('/adminUnBlockDepartment',adminUnBlockDepartment)
router.get('/getVerification',adminGetHospitalVerification)
router.post('/Verification',adminVerifyHospitals)

// router.get("/list-users",protect, adminListUsers);
// router.post("/search-users",protect, adminSearchUsers);
// router.post("/get-user",protect, adminGetUser);
// router.post("/delete-user",protect, adminDeleteUser);
// router.post("/edit-user",protect, adminEditUser);

export default router
   


