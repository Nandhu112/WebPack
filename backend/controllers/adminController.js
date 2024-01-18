import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"

import { getVerification, adminHospitalVerify } from "../helpers/adminHelper.js"     
// chk update12
// @dese Auth admin/set token
// route POST/api/admin/auth
//@access public
const authAdmin = asyncHandler(async (req, res) => {
    console.log("chkkkkkk")
    const { email, password } = req.body;       
    const admin = await User.findOne({ email, Admin: true });

    if (admin && (await admin.matchPassword(password))) {
        generateToken(res, admin._id);
        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email
        });
    } else {
        res.status(400);
        throw new Error('Invalid email or password');
    }
});

const adminGetHospitalVerification = asyncHandler(async (req, res) => {
    const result = await getVerification()
    res.json(result);
})

const adminVerifyHospitals = asyncHandler(async (req, res) => {
    const { hospital, application } = req.body;
    const result = await adminHospitalVerify(hospital, application)
    res.json(result);
})


export {
    authAdmin,
    adminGetHospitalVerification,
    adminVerifyHospitals

}
