import express from "express";
import { protect } from "../middleware/hospitalAuthMIddleweare.js";
import { upload } from "../config/multer.js";
import {listAllDepartment,
    HospitalAddNewDepartment,
    listHospitalDepartments} from "../controllers/departmentController.js"
import {addDoctor,hospitalListDoctors} from "../controllers/doctorController.js"
const router = express.Router()
import {
    authHospital,
    registerHospital,
    logoutHospital,
    getHospitalProfile,
    hospitalVerifyMail,
    adminverifyHospital,
    hospitalGetHospitalinfo,
    updateProfilePic,
    checkHospitalBlocked
} from "../controllers/hospitalController.js";   

router.post('/', registerHospital)
router.get('/hospitalVerify/:token', hospitalVerifyMail);
router.get('/checkHospitalBlocked', checkHospitalBlocked);
router.post('/auth', authHospital)
router.post('/logout', logoutHospital)
router.route('/profile').get(protect, getHospitalProfile)
router.get('/hospitalAllDepartment',protect,listAllDepartment)
router.post('/hospitalAddDepartment',protect,HospitalAddNewDepartment)      
router.get('/listHospitalDepartments',protect,listHospitalDepartments)    
router.post('/addDoctor',protect,addDoctor)     
router.get('/hospitalListDoctor',protect,hospitalListDoctors)     
router.post('/adminVeriftHospital',protect,adminverifyHospital)     
router.get('/getHospitalInfo',protect,hospitalGetHospitalinfo)         
router.post('/updateProfilePic',protect,updateProfilePic)     
// router.put(
//         "/profile-updateImage",
//         upload.single("image"),
//         protect,
//         updateUserImage
// );
export default router     