import asyncHandler from "express-async-handler"
import Hospital from "../models/hospitalModel.js"
import { Certificate } from "crypto";
import Verification from "../models/verificationModel.js"
import cloudinary from "../config/cloudinary.js"



const listHospitals = async (status,res) => {
  try {
    const status1 = status == "blocked"
    console.log(status1,'sta');
    const hospitals = await Hospital.find({isBlock: status1});
    return (hospitals)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const blockHospital = async (_id, res) => {
  try {
      const hospital = await Hospital.findById(_id);
      if (hospital) {
        hospital.isBlock = true; // Assuming this is meant to be 'isBlocked'
          await hospital.save();
      }
      return { success: "Hospital Blocked successfully" }; // Returned object corrected
  } catch (error) {
      res.status(500).json({ error: "Internal server error" });
  }
};

const unBlockHospital = async (_id, res) => {
  try {
      const hospital = await Hospital.findById(_id);
      if (hospital) {
        hospital.isBlock = false; // Assuming this is meant to be 'isBlocked'
          await hospital.save();
      }
      return { success: "Hospital UnBlocked successfully" }; // Returned object corrected
  } catch (error) {
      res.status(500).json({ error: "Internal server error" });
  }
};

const adminVerificationHospital = async(hospital,certificate, res) => {
  console.log(hospital,"hospital,certificate")

  const hospitalExist = await Verification.findOne({ hospital: hospital });
  console.log(hospitalExist,'Appilcation already exist11')
  if(hospitalExist){
    console.log('Appilcation already exist')
    res.json({ error: `Appilcation already exist`});

  }
 
      const result = await cloudinary.uploader.upload(certificate, {
        folder: "doctorprofilepic",
      });
      console.log(result,'result111111111111')
      const verification = await Verification.create({ certificate:result.secure_url,hospital });    
      if(verification) {
        console.log("sucess")
        return { success: "Application sent successfully" };
      }
     else{
      console.log("faild")
      return { error: `apply verification faild` };
     }   
    }

    const userListAllHospital = async (res) => {
      try {
        console.log('userListAllHospitals');
        const hospitals = await Hospital.find({isBlock:false,adminVerification:true});
        return (hospitals)
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }    
    };

    const getUserHosptial = async (_id, res) => {
      try {
          const hospital = await Hospital.findById(_id);
          if(hospital){
              return hospital;
          }
          else{
              return res.status(404).json({ error: "Patient not found" }); 
          }
         
      } catch (error) {
          return res.status(500).json({ error: "Internal server error" });
      }
  }
  
  const updateHospitalProfileImage = async (profileImage,_id,res) => {

    console.log(profileImage,_id,'profileImage1111')
    const result = await cloudinary.uploader.upload(profileImage, {
      folder: "doctorprofilepic",
    });
    console.log(result,'result111111111111')
    console.log(_id,'hhhhhhh')
    const hospital = await Hospital.findById(_id);     
    console.log(_id,'111')   
    if (hospital) {
      console.log(_id,'222')
      hospital.profileImage=result.secure_url;
      await hospital.save();
      return { success: "ProfileImage update successfully" };
    } else {
      res.status(400);
      return res.status(404).json({ error: "Hospital not found" }); 
    } 
  };

  const checkIsHospitalBlocked = async (_id,res) => {
    try {
      const hospital = await Hospital.findById({_id});
      if(hospital){
     
        if(hospital.isBlock){
            return({Blocked:true})
        }
        else{
            return({Blocked:false})
        }
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }    
  };

  
  export { 
    listHospitals,
    blockHospital,
    unBlockHospital,
    adminVerificationHospital,
    userListAllHospital,
    getUserHosptial,
    updateHospitalProfileImage,
    checkIsHospitalBlocked
   };