import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"
// import bcrypt from "bcrypt"
// import randomstring from "randomstring"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import dotevn from "dotenv"

import {listUsers,blockUsers,unBlockUnUsers,findNearbyHospitals,checkisUserBlocked} from "../helpers/userHelper.js"

dotevn.config();

// nodemailer
const emailTokens = {};
const jwtSecret = crypto.randomBytes(32).toString('hex'); // Generate a 256-bit random hexadecimal string
const vEmail = 'nandhuraj308@gmail.com'
// nodemailer


// @dese Auth user/set token
// route POST/api/users/auth
//@access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password, gmail } = req.body
  console.log('chkkk back')

  if (gmail) {
    const user = await User.findOne({ email })
    if (user) {
      generateToken(res, user._id)
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email
      })
    }
    else {
      res.status(400)
      throw new Error('Invalid email ')
    }

  }
  else {
    console.log('chkkkkkkkkkkkk')
    const user = await User.findOne({ email })
    console.log('chkkkkkkkkkkkk 123')
    if (user && (await user.matchPassword(password))) {
      console.log('chkkkkkkkkkkkk 12345')
      generateToken(res, user._id)
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email
      })
    }
    else {
      res.status(400)
      throw new Error('Invalid email or password')
    }
  }
})

// @dese Register a new user
// route POST/api/users
//@access public

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body, 'chkk body')
  let user
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
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
      text: `Click the following link to confirm your mail: http://localhost:5000/api/users/userVerify/${token}`
    };

    // Send mail
    await transporter.sendMail(mailOptions);
    console.log('Mail sent successfully!');
    res.status(200).json({message: "Email sent for verification"});
    if (password) {
      user = await User.create({
        name,
        email,
        password,
        token,
      });
    } else {
      user = await User.create({
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


// @dese User verification
// route GET/api/users/verification
//@access public

const verifyMail = async (req, res) => {
  console.log('chkk vry route 123')
  const token = req.params.token;
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const { vEmail } = decoded; // Assuming the email is stored in 'vEmail' within the token payload
    console.log('verification sucess')
    if (emailTokens[vEmail] === token) {
      console.log('chkk vry route 12345')
      const user = await User.findOne({ token: token });
      if (user) {
        user.verification = true;
        user.token=null // Update the verification status
        await user.save();
        console.log('User verified successfully');
        console.log('User verified successfully');
        generateToken(res, user._id);
        res.redirect('http://localhost:3000');
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
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

// @dese Logout user
// route POST/api/users/logout
//@access public
const logoutUser = asyncHandler(async (req, res) => {

  res.cookie('jwt', "", {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({ message: " user logged out " })
})

// @dese Get user profile
// route GET/api/users/profile
//@access private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email
  }
  res.status(200).json(user)
})

// @dese Update user profile
// route PUT/api/users/profile
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {
  console.log(req.body, 'emaillll');
  const user = await User.findById(req.user._id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email

    })

  } else {
    res.status(404)
    throw new Error('User Not Found')
  }

})

const updateUserImage = asyncHandler(async (req, res) => {
  try {
    if (req.file) {
      User.findByIdAndUpdate(
        { _id: req.body.id },
        { profileImage: req.file.filename }
      ).catch(err => {
        console.log(err.message);
      })
      res.status(200).json({ profileImage: req.file.filename })
    }
  } catch (error) {
    console.log(error.message);
  }
});

const listAllUsers =asyncHandler(async (req,res)=>{
  console.log(req.query);
  const status=req.query.status || 'unBlocked'
  const result =  await listUsers(status)
  res.json(result);
})

const adminBlockUser =asyncHandler(async (req,res)=>{
  const {user_id } =req.body
  const result =  await blockUsers(user_id)
  res.json(result);
})
const adminUnBlockUser =asyncHandler(async (req,res)=>{
  const {user_id } =req.body
  const result =  await unBlockUnUsers(user_id)
  res.json(result);
})

const userFindNearbyHospitals =asyncHandler(async (req,res)=>{
  console.log('userFindNearbyHospitals')
  const {distance,accessLatitude,accessLongitude } =req.body
  const result =  await findNearbyHospitals(distance,accessLatitude,accessLongitude )     
  res.json(result);
})


const checkUserBlocked  =asyncHandler(async (req,res)=>{
  console.log(req.query,'chkk blkd')
  const {_id} = req.query
  console.log(_id,'chkk blkd')
  const result =  await checkisUserBlocked(_id)     
  res.json(result);
})




export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updateUserImage,
  verifyMail,
  listAllUsers,
  adminBlockUser,
  adminUnBlockUser,
  userFindNearbyHospitals,
  checkUserBlocked
  
}


//sample@112
