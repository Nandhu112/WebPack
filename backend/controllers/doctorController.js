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
    lListAllDoctorAppointments
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
    console.log('ctr addDoctor')     
    const {  name,email,hospital,department,password,title,qualification,description } = req.body;
    console.log( name,email,hospital,department,password ,'ctr addDoctor')
    const result = await addNewDoctor(name,email,hospital,department,password,title,qualification,description, res);
    res.json(result); // Send the result back to the client
  });

  const authDoctor = asyncHandler(async (req, res) => {
    const {email,password} = req.body;
    console.log('ctr addDoctor')     
    const doctor = await Doctor.findOne({ email});
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
    console.log("chkkkkkkkkk doc 11")    
    const { id } = req.query;
    const result = await getDoctorFullInfo(id, res);
    console.log(result,'result')
    res.json(result); // Send the result back to the client
  });

  const verificationDoctor = asyncHandler(async (req, res) => {
    console.log(req.body, 'chkk body')
    let doctors
    const { email, password} = req.body;
    const doctor = await Doctor.findOne({ email: email });
    if (!doctor) {
      res.status(400);
      throw new Error("Emai Not found");
    }
  
    // nodemailer
  
    console.log('chkkk mail');
    console.log(jwtSecret, 'jwtSecret');
    const token = jwt.sign({ vEmail }, jwtSecret, { expiresIn: '60s' });
    emailTokens[vEmail] = token;
    console.log('chkkk mail 22');
    console.log(process.env.AUTH_EMAIL, process.env.AUTH_PASS);
  
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
        text: `Click the following link to confirm your mail: http://localhost:5000/api/doctors/doctorVerifyMail/${token}`
      };
  
      // Send mail
      await transporter.sendMail(mailOptions);
      console.log('Mail sent successfully!');
      res.status(200).json({message: "Email sent for verification"});
      const doctors = await Doctor.findOne({ email: email });
      if (doctors) {
        console.log(token, 'chkk if doctor')
        doctors.token = token;
        doctors.password=password // Update the verification status
        await doctors.save();
        };
    } catch (error) {
      console.error('Error sending mail:', error);
      throw new Error('Error sending mail:', error);
      // Handle the error or log it for debugging purposes
    }
  
  });
  

  const doctorVerifyMail = async (req, res) => {
    console.log('chkk vry route 123')
    const token = req.params.token;
    console.log(token,'chkk vry token')
    try {
      const decoded = jwt.verify(token, jwtSecret);
      const { vEmail } = decoded; // Assuming the email is stored in 'vEmail' within the token payload
      console.log('verification sucess')
      if (emailTokens[vEmail] === token) {
        console.log('chkk vry route 12345')
        const doctor = await Doctor.findOne({ token: token });
        if (doctor) {
          doctor.verification = true;
          doctor.token=null // Update the verification status
          await doctor.save();
          console.log('hospital verified successfully');
         
          generateToken(res, doctor._id);
          res.redirect('http://localhost:3000/doctor');
          res.status(201).json({
            _id: doctor._id,
            name: doctor.name,
            email: doctor.email,
          });
        } else {
          console.log('else user');
          res.status(400);
          throw new Error("Invalid user data");
        }
  
        console.log('verifiction sucess');
      } else {
        console.log('Token is invalid or expired');
        // Handle invalid/expired token case
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      // Handle token verification failure (invalid token, etc.)
    }
  };
  
  const logoutDoctor = asyncHandler (async(req,res)=>{
    console.log('chk logout in ctr')
       res.cookie('jwt',"",{
           httpOnly:true,
           expires: new Date(0)
       })
       res.status(200).json({message:" doctor logged out "})
      }) 

  const updateDoctorProfileImage = asyncHandler(async (req, res) => {
    console.log('chkk updateDoctorProfileImage ')
        const {        
          profileImage,   
          _id
        } = req.body;
        console.log(profileImage,'profileImage1111')
        const result = await cloudinary.uploader.upload(profileImage, {
          folder: "doctorprofilepic",
        });
        console.log(result,'result111111111111')
        console.log(_id,'hhhhhhh')
        const doctor = await Doctor.findById(_id);     
        console.log(_id,'111')   
        if (doctor) {
          console.log(_id,'222')
          doctor.profileImage=result.secure_url;
          await doctor.save();
          res.status(200).json({message:"Profile image added successfully"})
        } else {
          res.status(400);
          throw new Error("Invalid user data");
        }
      });
      const listAllDoctors =asyncHandler(async (req,res)=>{
        console.log(req.query);
        const status=req.query.status || 'unBlocked'
        console.log('chk listHospitals')
        const result =  await listDoctors(status)
        res.json(result);
      })

      const adminBlockDoctor =asyncHandler(async (req,res)=>{
        const {user_id } =req.body
        const result =  await blockDoctor(user_id)
        res.json(result);
      })
      const adminUnBlockDoctor =asyncHandler(async (req,res)=>{
        const {user_id } =req.body
        const result =  await unBlockDoctor(user_id)
        res.json(result);
      })
      const hospitalListDoctors =asyncHandler(async (req,res)=>{
        const {_id,department } =req.query
        console.log(department,"chkk department")
        const result =  await HospitalListAllDoctors(_id,department)
        res.json(result);
      })
      const hospitalRemoveDocors =asyncHandler(async (req,res)=>{
        const {_id } =req.query
        console.log(_id,"chkk id")
        const result =  await HospitalListAllDoctors(_id)
        res.json(result);
      })

      const checkDoctorBlocked  =asyncHandler(async (req,res)=>{
        const {_id} = req.query
        console.log(_id,'chkk blkd')   
        const result =  await checkIsDoctorBlocked(_id)            
        res.json(result);
      })

      const doctorListAppointments =asyncHandler(async (req,res)=>{
        const {_id } =req.query
        const result =  await lListAllDoctorAppointments(_id)
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
    checkDoctorBlocked ,
    doctorListAppointments
} 