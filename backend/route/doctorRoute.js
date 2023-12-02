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
    checkDoctorBlocked

} from "../controllers/doctorController.js";

router.post('/',authDoctor)
router.post('/verification', verificationDoctor)
router.get('/doctorVerifyMail/:token', doctorVerifyMail);
router.get('/getProfile',doctorProtect,getDoctorInfo)
router.post('/updateDoctorPic',doctorProtect,updateDoctorProfileImage)
router.get('/checkDoctorBlocked',checkDoctorBlocked)
router.post('/logout', logoutDoctor)


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