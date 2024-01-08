import asyncHandler from "express-async-handler"
import Hospital from "../models/hospitalModel.js"
import { Certificate } from "crypto";
import Verification from "../models/verificationModel.js"
import cloudinary from "../config/cloudinary.js"
import Appointment from "../models/appointmentModel.js";
import History from "../models/history.js";




const listHospitals = async (status, res) => {
  // try {
  //   const status1 = status == "blocked"
  //   const hospitals = await Hospital.find({ isBlock: status1 });
  //   return (hospitals)
  // } catch (error) {
  //   res.status(500).json({ error: "Internal server error" });
  // }

  try {
  
    const status1 = status == "blocked";
    const hospitals = await Hospital.find({ isBlock: status1 });
    const hospitalDataPromises = hospitals.map(async (hospital) => {
      const hospitalsId = hospital._id;
      const appointmentCount = await Appointment.countDocuments({ hospital: hospitalsId });
      const historyCount = await History.countDocuments({ hospitalId: hospitalsId });
 

      return {
        hospitalDetails: hospital,
        appointmentCount,
        historyCount,
      };
    });

    const hospitalsWithData = await Promise.all(hospitalDataPromises);

    return hospitalsWithData;
  } catch (error) {
    return { error: 'An error occurred while fetching departments data' };
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

const adminVerificationHospital = async (hospital, certificate, res) => {

  const hospitalExist = await Verification.findOne({ hospital: hospital });
  if (hospitalExist) {
    res.json({ error: `Appilcation already exist` });

  }

  const result = await cloudinary.uploader.upload(certificate, {
    folder: "doctorprofilepic",
  });
  const verification = await Verification.create({ certificate: result.secure_url, hospital });
  if (verification) {
    return { success: "Application sent successfully" };
  }
  else {
    return { error: `apply verification faild` };
  }
}

const userListAllHospital = async (res) => {
  try {
    const hospitals = await Hospital.find({ isBlock: false, adminVerification: true });
    return (hospitals)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserHosptial = async (_id, res) => {
  try {
    const hospital = await Hospital.findById(_id);
    if (hospital) {
      return hospital;
    }
    else {
      return res.status(404).json({ error: "Patient not found" });
    }

  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

const updateHospitalProfileImage = async (profileImage, _id, res) => {

  const result = await cloudinary.uploader.upload(profileImage, {
    folder: "doctorprofilepic",
  });
  const hospital = await Hospital.findById(_id);
  if (hospital) {
    hospital.profileImage = result.secure_url;
    await hospital.save();
    return { success: "ProfileImage update successfully" };
  } else {
    res.status(400);
    return res.status(404).json({ error: "Hospital not found" });
  }
};

const checkIsHospitalBlocked = async (_id, res) => {
  try {
    const hospital = await Hospital.findById({ _id });
    if (hospital) {

      if (hospital.isBlock) {
        return ({ Blocked: true })
      }
      else {
        return ({ Blocked: false })
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