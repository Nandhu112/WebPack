import asyncHandler from "express-async-handler"
import Doctor from "../models/doctorModel.js"
import generateToken from "../utils/generateToken.js"
import cloudinary from "../config/cloudinary.js"
import {
  addNewDoctor,
  getDoctorFullInfo,
  listDoctors,
  blockDoctor,
  unBlockDoctor,
  HospitalListAllDoctors,
  checkIsDoctorBlocked,
  listAllDoctorAppointments
} from "../helpers/doctorHelper.js"

import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import dotevn from "dotenv"


// nodemailer
const emailTokens = {};
const jwtSecret = crypto.randomBytes(32).toString('hex'); // Generate a 256-bit random hexadecimal string
const vEmail = 'nandhuraj308@gmail.com'
// nodemailer

const addDoctor = asyncHandler(async (req, res) => {
  const { name, email, hospital, department, password, title, qualification, description } = req.body;
  const result = await addNewDoctor(name, email, hospital, department, password, title, qualification, description, res);
  res.json(result); // Send the result back to the client
});

const authDoctor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const doctor = await Doctor.findOne({ email });
  if (doctor && (await doctor.matchPassword(password))) {
    generateToken(res, doctor._id);
    res.status(201).json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email
    });
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }

});

const getDoctorInfo = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const result = await getDoctorFullInfo(id, res);
  res.json(result); // Send the result back to the client
});

const verificationDoctor = asyncHandler(async (req, res) => {
  let doctors
  const { email, password } = req.body;
  const doctor = await Doctor.findOne({ email: email });
  if (!doctor) {
    res.status(400);
    throw new Error("Emai Not found");
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
      text: `Click the following link to confirm your mail: https://medpack.online/api/doctors/doctorVerifyMail/${token}`
    };

    // Send mail
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent for verification" });
    const doctors = await Doctor.findOne({ email: email });
    if (doctors) {
      doctors.token = token;
      doctors.password = password // Update the verification status
      await doctors.save();
    };
  } catch (error) {
    console.error('Error sending mail:', error);
    throw new Error('Error sending mail:', error);
    // Handle the error or log it for debugging purposes
  }

});


const doctorVerifyMail = async (req, res) => {
  const token = req.params.token;
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const { vEmail } = decoded; // Assuming the email is stored in 'vEmail' within the token payload
    if (emailTokens[vEmail] === token) {
      const doctor = await Doctor.findOne({ token: token });
      if (doctor) {
        doctor.verification = true;
        doctor.token = null // Update the verification status
        await doctor.save();

        generateToken(res, doctor._id);
        res.redirect('https://medpack.online/doctor');
        res.status(201).json({
          _id: doctor._id,
          name: doctor.name,
          email: doctor.email,
        });
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

const logoutDoctor = asyncHandler(async (req, res) => {
  res.cookie('jwt', "", {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({ message: " doctor logged out " })
})

const updateDoctorProfileImage = asyncHandler(async (req, res) => {
  const {
    profileImage,
    _id
  } = req.body;
  const result = await cloudinary.uploader.upload(profileImage, {
    folder: "doctorprofilepic",
  });
  const doctor = await Doctor.findById(_id);
  if (doctor) {
    doctor.profileImage = result.secure_url;
    await doctor.save();
    res.status(200).json({ message: "Profile image added successfully" })
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
const listAllDoctors = asyncHandler(async (req, res) => {
  const status = req.query.status || 'unBlocked'
  const result = await listDoctors(status)
  res.json(result);
})

const adminBlockDoctor = asyncHandler(async (req, res) => {
  const { user_id } = req.body
  const result = await blockDoctor(user_id)
  res.json(result);
})
const adminUnBlockDoctor = asyncHandler(async (req, res) => {
  const { user_id } = req.body
  const result = await unBlockDoctor(user_id)
  res.json(result);
})
const hospitalListDoctors = asyncHandler(async (req, res) => {
  const { _id, department } = req.query
  const result = await HospitalListAllDoctors(_id, department)
  res.json(result);
})
const hospitalRemoveDocors = asyncHandler(async (req, res) => {
  const { _id } = req.query
  const result = await HospitalListAllDoctors(_id)
  res.json(result);
})

const checkDoctorBlocked = asyncHandler(async (req, res) => {
  const { _id } = req.query
  const result = await checkIsDoctorBlocked(_id)
  res.json(result);
})

const doctorListAppointments = asyncHandler(async (req, res) => {
  const { _id, status } = req.query
  const result = await listAllDoctorAppointments(_id, status)
  res.json(result);
})


export {
  addDoctor,
  authDoctor,
  getDoctorInfo,
  verificationDoctor,
  doctorVerifyMail,
  logoutDoctor,
  updateDoctorProfileImage,
  listAllDoctors,
  adminBlockDoctor,
  adminUnBlockDoctor,
  hospitalListDoctors,
  hospitalRemoveDocors,
  checkDoctorBlocked,
  doctorListAppointments
} 