import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../config/multer.js";
const router = express.Router()
import {
        authUser,
        registerUser,
        logoutUser,
        getUserProfile,
        updateUserProfile,
        updateUserImage,
        verifyMail,
        userFindNearbyHospitals,
        checkUserBlocked
} from "../controllers/userController.js";

import {addNewPatient,listAllPatients,getPatientInfo,updateProfilePic} from "../controllers/patientController.js"

import {userListAllHospitals} from "../controllers/hospitalController.js"

import {makeAppointment,listDoctorAppointments} from "../controllers/appointmentController.js"
import {listHospitalDepartments} from "../controllers/departmentController.js"
import {hospitalListDoctors} from "../controllers/doctorController.js"
import{getPatientHistory,getPatientHistoryByAppointment} from "../controllers/historyController.js"
import{createAppointment,capturePayment} from "../controllers/paymentController.js"
import {addNewMessage,userlListAllChats,userlListAllMessages,userDirectListAllMessages} from "../controllers/chatController.js"
import {getNotification,changeNotifictionStatus} from "../controllers/notificationController.js"
import{addNewRating,getHospitalsRatingInfo} from "../controllers/hospitalRatingController.js"
import{addNewDoctorRating,getDoctorsRatingInfo} from "../controllers/doctorRatingController.js"

router.post('/', registerUser)
router.get('/userVerify/:token', verifyMail);
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.get('/listHospital', userListAllHospitals)
router.post('/addNewMember',protect, addNewPatient)
router.get('/listAllMembers',protect, listAllPatients)
router.get('/getPatientInfo',protect, getPatientInfo)
router.post('/findNearbyHospitals',protect,userFindNearbyHospitals)
router.post('/makeAppointment',protect,makeAppointment)
router.post('/listDoctorAppointments',protect,listDoctorAppointments)
router.get('/listHospitalDepartments',protect,listHospitalDepartments)    
router.get('/checkBlock',checkUserBlocked)
router.get('/hospitalListDoctor',protect,hospitalListDoctors)     
router.get('/getPatientHistory',protect,getPatientHistory)     
router.post('/updatePatientProflePic',protect,updateProfilePic)        
router.post('/orders',protect,createAppointment)        
router.post('/orderCapture',protect,capturePayment)        
router.post('/addMessage',protect,addNewMessage)    
router.get('/listChat',protect,userlListAllChats)    
router.get('/listMessage',protect,userlListAllMessages)    
router.get('/directListMessage',protect,userDirectListAllMessages)    
router.get('/getNotification',protect,getNotification)    
router.post('/changeNotifictionStatus',protect,changeNotifictionStatus)    
router.post('/addNewHospitalRating',protect,addNewRating)    
router.post('/addNewDoctorRating',protect,addNewDoctorRating)   
router.get('/getHospitalsRatingInfo',protect,getHospitalsRatingInfo)   
router.get('/getDoctorsRatingInfo',protect,getDoctorsRatingInfo)   
router.get('/getPatientHistoryByAppointment',protect,getPatientHistoryByAppointment)   



router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.put(
        "/profile-updateImage",
        upload.single("image"),
        protect,   
        updateUserImage
);
export default router