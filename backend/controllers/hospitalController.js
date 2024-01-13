import asyncHandler from "express-async-handler"
import Hospital from "../models/hospitalModel.js"
import generateToken from "../utils/generateToken.js"
import {
  listHospitals, blockHospital, unBlockHospital, adminVerificationHospital,
  userListAllHospital, getUserHosptial, updateHospitalProfileImage, checkIsHospitalBlocked
} from "../helpers/hospitalHelper.js"


import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import dotevn from "dotenv"

dotevn.config();

// nodemailer
const emailTokens = {};
const jwtSecret = crypto.randomBytes(32).toString('hex'); // Generate a 256-bit random hexadecimal string
const vEmail = 'nandhuraj308@gmail.com'
// nodemailer

// @dese Auth hospital/set token
// route POST/api/hospitals/auth
//@access public

const authHospital = asyncHandler(async (req, res) => {
  const { email, password, gmail } = req.body;

  const hospital = await Hospital.findOne({ email });

  if (hospital && (await hospital.matchPassword(password))) {
    generateToken(res, hospital._id);
    res.status(201).json({
      _id: hospital._id,
      name: hospital.name,
      email: hospital.email
    });
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }


});


// @dese Register a new hospital
// route POST/api/hospitals
// @access public
const registerHospital = asyncHandler(async (req, res) => {
  let hospital
  const { name, email, password, title, address, accessLatitude, accessLongitude } = req.body;
  const hospitalExist = await Hospital.findOne({ email: email });
  if (hospitalExist) {
    res.status(400);
    throw new Error("Emai already exist");
  }

  // nodemailer

  const token = jwt.sign({ vEmail }, jwtSecret, { expiresIn: '60s' });
  emailTokens[vEmail] = token;

  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
      }
    });

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: 'Mail verification',
      text: `Click the following link to confirm your mail: https://medpack.online/api/hospitals/hospitalVerify/${token}`
    };

    // Send mail
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent for verification" });
    if (password) {
      hospital = await Hospital.create({
        name,
        email,
        password,
        title,
        address,
        token,
        latitude: accessLatitude,
        longitude: accessLongitude
      });
    } else {
      hospital = await Hospital.create({
        name,
        email,
      });
    }
  } catch (error) {
    console.error('Error sending mail:', error);
    throw new Error('Error sending mail:', error);
    // Handle the error or log it for debugging purposes
  }

});

// @dese Hospital verification
// route GET/api/hospital/verification
//@access public

const hospitalVerifyMail = async (req, res) => {
  const token = req.params.token;
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const { vEmail } = decoded; // Assuming the email is stored in 'vEmail' within the token payload
    if (emailTokens[vEmail] === token) {
      const hospital = await Hospital.findOne({ token: token });
      if (hospital) {
        hospital.verification = true;
        hospital.token = null // Update the verification status
        await hospital.save();

        // generateToken(res, hospital._id);
        res.redirect('https://medpack.online/hospital');
        // res.status(201).json({
        //   _id: hospital._id,
        //   name: hospital.name,
        //   email: hospital.email,
        // });
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }

    } else {
      // Handle invalid/expired token case
    }
  } catch (error) {
    console.error('Token verification failed:', error);
    // Handle token verification failure (invalid token, etc.)
  }
};

// @dese Logout hospital
// route POST/api/hospitals/logout
//@access public
const logoutHospital = asyncHandler(async (req, res) => {
  res.cookie('jwt', "", {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({ message: " user logged out " })
})

// @dese Get hospital profile
// route GET/api/hospitals/profile
//@access private
const getHospitalProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email
  }
  res.status(200).json(user)
})

const listAllHospitals = asyncHandler(async (req, res) => {
  const status = req.query.status || 'unBlocked'
  const result = await listHospitals(status)
  res.json(result);
})

const adminBlockHospital = asyncHandler(async (req, res) => {
  const { user_id } = req.body
  const result = await blockHospital(user_id)
  res.json(result);
})
const adminUnBlockHospital = asyncHandler(async (req, res) => {
  const { user_id } = req.body
  const result = await unBlockHospital(user_id)
  res.json(result);
})

const adminverifyHospital = asyncHandler(async (req, res) => {
  const {
    certificate,
    hospital
  } = req.body;
  const result = await adminVerificationHospital(hospital, certificate)
  res.json(result);
})

const userListAllHospitals = asyncHandler(async (req, res) => {
  const hospitals = await userListAllHospital(); // Assuming the correct function name is fetchAllHospitals()
  res.json(hospitals);
});

const hospitalGetHospitalinfo = asyncHandler(async (req, res) => {
  const { _id } = req.query
  const hospitals = await getUserHosptial({ _id: _id }); // Assuming the correct function name is fetchAllHospitals()
  res.json(hospitals);
});

const updateProfilePic = asyncHandler(async (req, res) => {
  const {
    profileImage,
    _id
  } = req.body;
  const result = await updateHospitalProfileImage(profileImage, _id)
  res.json(result);
})

const checkHospitalBlocked = asyncHandler(async (req, res) => {
  const { _id } = req.query
  const result = await checkIsHospitalBlocked(_id)
  res.json(result);
})



export {
  authHospital,
  registerHospital,
  logoutHospital,
  getHospitalProfile,
  hospitalVerifyMail,
  listAllHospitals,
  adminBlockHospital,
  adminUnBlockHospital,
  adminverifyHospital,
  userListAllHospitals,
  hospitalGetHospitalinfo,
  updateProfilePic,
  checkHospitalBlocked


  // updateUserImage
}


//sample@112
