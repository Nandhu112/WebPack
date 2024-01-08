import express from "express";
import { doctorProtect } from "../middleware/doctorAuthMiddleweare.js";
import { upload } from "../config/multer.js";

const router = express.Router()
import {
    authDoctor,
    getDoctorInfo,
    doctorVerifyMail,
    verificationDoctor,
    logoutDoctor,
    updateDoctorProfileImage,
    checkDoctorBlocked,
    doctorListAppointments

} from "../controllers/doctorController.js";

import{getPatientInfo}from "../controllers/patientController.js"

import {addNewRecord,findPatientRecord,deleteRecord} from "../controllers/recordController.js"

import{addNewRecordtoHistory,doctorGetAppointmentStatus,getPatientHistory} from "../controllers/historyController.js"
import {listDoctorAppointments,doctorSlotBlock} from "../controllers/appointmentController.js"
import {newNotification,prescriptionNotification} from "../controllers/notificationController.js"

router.post('/',authDoctor)
router.post('/verification', verificationDoctor)
router.get('/doctorVerifyMail/:token', doctorVerifyMail);
router.get('/getProfile',doctorProtect,getDoctorInfo)
router.post('/updateDoctorPic',doctorProtect,updateDoctorProfileImage)
router.get('/checkDoctorBlocked',checkDoctorBlocked)     
router.get('/listAppointments',doctorProtect,doctorListAppointments)
router.get('/getPatientInfo',doctorProtect, getPatientInfo)
router.post('/logout', logoutDoctor)
router.post('/addNewRecord',doctorProtect, addNewRecord)
router.put('/deleteRecord',doctorProtect, deleteRecord)
router.post('/addtoHistory',doctorProtect, addNewRecordtoHistory)
router.get('/getAppointmentStatus',doctorProtect, doctorGetAppointmentStatus)
router.post('/listDoctorAppointments',doctorProtect,listDoctorAppointments)
router.post('/blockSlot',doctorProtect,doctorSlotBlock)
router.post('/sendNotification',doctorProtect,newNotification)
router.post('/sendPrescriptionNotification',doctorProtect,prescriptionNotification)
router.get('/getPatientHistory',doctorProtect,getPatientHistory)    



// router.get('/hospitalVerify/:token', hospitalVerifyMail);
// router.post('/auth', authHospital)
// router.post('/logout', logoutHospital)
// router.route('/profile').get(protect, getHospitalProfile).put(protect, updateHospitalProfile)
// router.get('/hospitalAllDepartment',listAllDepartment)
// router.post('/hospitalAddDepartment',HospitalAddNewDepartment)
// router.get('/listHospitalDepartments',listHospitalDepartments)    
// router.post('/addDoctor',addDoctor)     
// // router.put(
// //         "/profile-updateImage",
// //         upload.single("image"),
// //         protect,
// //         updateUserImage
// // );
export default router     